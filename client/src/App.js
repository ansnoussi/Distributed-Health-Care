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
      showRecModal: false, // to show or hide the reclamation modal
      didAtLeastOneSearch : false, // self explanatory
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
      this.setState({searchTerm : evt.target.value, didAtLeastOneSearch : true})

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
    }


    /** Display selected medicine in modal window */
    async showMedicineModal (searchHit) {
      this.setState({selectedMedicine : searchHit })
    }


    /** Close the medicine detail modal */
    closeMedicineModal () {
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

        {/* when the are no output, give option to make reclamation */}
        {this.state.searchResults.length === 0 && this.state.didAtLeastOneSearch ?

        <div 
          className="mui-panel" 
          style={{display : 'flex' , justifyContent : 'center', flexDirection : 'column', alignItems: 'center'}} 
          onClick={() => this.setState({showRecModal : true})} 
        >
          <span className="material-icons md-48">help</span>
          <div className="mui--text-title" > Didn't find what you are looking for ? </div>
        </div>

        :null}

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

            
          <div className="info-row" >
            <div className="mui--text-subhead"> forme : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.forme }
            </div>
          </div>

          <div className="info-row" >
            <div className="mui--text-subhead"> presentation : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.presentation }
            </div>
          </div>
    
          
          <div className="info-row" >
            <div className="mui--text-subhead"> conditionnement_primaire : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.conditionnement_primaire }
            </div>
          </div>



          <div className="info-row" >
            <div className="mui--text-subhead"> specification : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.specification }
            </div>
          </div>


          <div className="info-row" >
            <div className="mui--text-subhead"> dci : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.dci }
            </div>
          </div>


          <div className="info-row" >
            <div className="mui--text-subhead"> classement_VEIC : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.classement_VEIC }
            </div>
          </div>
          
          <div className="info-row" >
            <div className="mui--text-subhead"> classe_therapeutique : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.classe_therapeutique }
            </div>
          </div>


          <div className="info-row" >
            <div className="mui--text-subhead"> sous_classe : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.sous_classe }
            </div>
          </div>

          <div className="info-row" >
            <div className="mui--text-subhead"> laboratoire : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2"> 
              { this.state.selectedMedicine._source.laboratoire }
            </div>
          </div>


          <div className="info-row" >
            <div className="mui--text-subhead"> tableau : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.tableau }
            </div>
          </div>


          <div className="info-row" >
            <div className="mui--text-subhead"> duree_conservation : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.duree_conservation }
            </div>
          </div>


          <div className="info-row" >
            <div className="mui--text-subhead"> generique_princeps : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.generique_princeps }
            </div>
          </div>


          <div className="info-row" >
            <div className="mui--text-subhead"> amm : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.amm }
            </div>
          </div>

          <div className="info-row" >
            <div className="mui--text-subhead"> date_amm : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.date_amm }
            </div>
          </div>


            <div className="mui--text-subhead"> indication : </div>
            <div className="mui--text-body2">
              { this.state.selectedMedicine._source.indication }
            </div>



        {/* <!-- Medicine Pagination Footer --> */}
        <div className="modal-footer">
          <button className="mui-btn mui-btn--flat" onClick={this.closeMedicineModal}>Close</button>
        </div>

        </div>      
        </div>

      : null}



      {/* <!-- Medicine Modal Window --> */}
      {this.state.showRecModal ? 
      
      <div className="medicine-modal">
        <div className="medicine-container">

          {/* <!-- Medicine Section Metadata --> */}
          <div className="title-row">
            <div className="mui--text-display2 all-caps"> aaaaaa </div>
            <div className="mui--text-display1"> bbbbbbb </div>
          </div>

          <br/>

          <div className="info-row" >
            <div className="mui--text-subhead"> wa : </div>
            <div className="mui--text-body2">
              cccccc
            </div>
          </div>


        {/* <!-- Medicine Pagination Footer --> */}
        <div className="modal-footer">
          <button className="mui-btn mui-btn--flat"onClick={() => this.setState({showRecModal : false})} >Close</button>
        </div>

        </div>      
        </div>

      : null}


    </div>
    )  
  }
}

export default App;
