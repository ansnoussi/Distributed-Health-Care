import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      baseUrl: 'http://localhost:3000', // API url
      searchTerm: '', // Default search term
      searchResults: [], // Displayed search results
      numHits: null, // Total search results found
      searchOffset: 0, // Search result pagination offset
      selectedMedicine: null, // Selected paragraph object
    }
    this.searchDebounce = null

    //binding functions
    this.onSearchInput = this.onSearchInput.bind(this)
    this.search = this.search.bind(this)
    this.nextResultsPage = this.nextResultsPage.bind(this)
    this.prevResultsPage = this.prevResultsPage.bind(this)
    this.showMedicineModal = this.showMedicineModal.bind(this)
    this.closeMedicineModal = this.closeMedicineModal.bind(this)
  }



    /** Debounce search input by 100 ms */
    onSearchInput (evt) {
      this.setState({searchTerm : evt.target.value})

      clearTimeout(this.searchDebounce)
      this.searchDebounce = setTimeout(async () => {
        const rez = await this.search()
        this.setState({ searchOffset : 0, searchResults : rez })
      }, 100)

    }

    /** Call API to search for inputted term */
    async search () {
      const response = await axios.get(`${this.state.baseUrl}/search`, { params: { term: this.state.searchTerm, offset: this.state.searchOffset } })
      this.setState({numHits : response.data.hits.total })
      return response.data.hits.hits
    }

    /** Get next page of search results */
    async nextResultsPage () {
      if (this.state.numHits > 10) {
        let newOffset = this.state.searchOffset + 10
        this.setState({searchOffset : newOffset})

        if (this.state.searchOffset + 10 > this.state.numHits) {
          this.setState({searchOffset : this.state.numHits - 10 }) 
        }

        const rez = await this.search()
        this.setState({searchResults : rez})
      }
    }


    /** Get previous page of search results */
    async prevResultsPage () {
      let newOffset = this.state.searchOffset - 10
      
      if (newOffset < 0) { 
        this.setState({searchOffset : 0}) 
      }else {
        this.setState({ searchOffset : newOffset })
      }

      const rez = await this.search()

      this.setState({searchResults : rez})
      // document.documentElement.scrollTop = 0
    }


    /** Display selected medicine in modal window */
    async showMedicineModal (searchHit) {
      // document.body.style.overflow = 'hidden'
      this.setState({selectedMedicine : searchHit })
    }


    /** Close the medicine detail modal */
    closeMedicineModal () {
      // document.body.style.overflow = 'auto'
      this.setState({ selectedMedicine : null})
    }



  render() {
    return(
    <div className="app-container" >

      {/* <!-- Search Bar Header --> */}
      <div className="mui-panel">
        <div className="mui-textfield">
          <input type="text" value={this.state.searchTerm} onChange={this.onSearchInput} />
          <label>Search</label>
        </div>
      </div>

      {/* <!-- Search Metadata Card --> */}
      <div className="mui-panel">
        <div className="mui--text-headline">{ this.state.numHits } Hits</div>
        <div className="mui--text-subhead">Displaying Results { this.state.searchOffset } - { this.state.searchOffset + 9 }</div>
      </div>

      {/* <!-- Search Results Card List --> */}
      <div className="search-results">

      {this.state.searchResults.map((hit, index) => {
        return (<div className="mui-panel" onClick={() => this.showMedicineModal(hit)} key={index} >
              <div className="mui--text-title" > { hit._source.specialite } </div>
              <div className="mui-divider"></div>
              <div className="mui--text-subhead"> { hit._source.dci }</div>
              <div className="mui--text-body2"> Dosage : { hit._source.dosage }</div>
              <div className="mui--text-body2"> Forme : { hit._source.forme }</div>
        </div>)
      })}

      </div>

      {/* <!-- Bottom Pagination Card --> */}
      <div className="mui-panel pagination-panel">
          <button className="mui-btn mui-btn--flat" onClick={this.prevResultsPage}>Prev Page</button>
          <button className="mui-btn mui-btn--flat"  onClick={this.nextResultsPage}>Next Page</button>
      </div>

      {/* <!-- Medicine Modal Window --> */}
      {this.state.selectedMedicine ? 
      
      <div className="medicine-modal">
        <div className="medicine-container">

          {/* <!-- Medicine Section Metadata --> */}
          <div className="title-row">
            <div className="mui--text-display2 all-caps">{ this.state.selectedMedicine._source.specialite }</div>
            <div className="mui--text-display1">{ this.state.selectedMedicine._source.dci }</div>
          </div>

          <br/>

          <div className="info-row" >
            <div className="mui--text-subhead"> specialite : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.specialite }
            </div>
          </div>

          <div className="info-row" >
            <div className="mui--text-subhead"> dosage : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.dosage }
            </div>
          </div>

          {/* Continue ... */}

        </div>

        {/* <!-- Medicine Pagination Footer --> */}
        <div className="modal-footer">
          <button className="mui-btn mui-btn--flat" onClick={this.closeMedicineModal}>Close</button>
        </div>

      </div>


      : null}

    </div>
    )  
  }
}

export default App;
