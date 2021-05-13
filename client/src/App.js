import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    baseUrl: 'http://localhost:3000', // API url
    searchTerm: '', // Default search term
    searchDebounce: null, // Timeout for search bar debounce
    searchResults: [], // Displayed search results
    numHits: null, // Total search results found
    searchOffset: 0, // Search result pagination offset
    selectedMedicine: null, // Selected paragraph object
  };


    /** Debounce search input by 100 ms */
    onSearchInput () {
      clearTimeout(this.state.searchDebounce)
      this.state.searchDebounce = setTimeout(async () => {
        this.state.searchOffset = 0
        this.state.searchResults = await this.search()
      }, 100)
    }

    /** Call API to search for inputted term */
    async search () {
      const response = await axios.get(`${this.state.baseUrl}/search`, { params: { term: this.state.searchTerm, offset: this.state.searchOffset } })
      this.state.numHits = response.data.hits.total
      console.log(response.data.hits.hits)
      return response.data.hits.hits
    }

    /** Get next page of search results */
    async nextResultsPage () {
      if (this.state.numHits > 10) {
        this.state.searchOffset += 10
        if (this.state.searchOffset + 10 > this.state.numHits) { this.state.searchOffset = this.state.numHits - 10}
        this.state.searchResults = await this.search()
        document.documentElement.scrollTop = 0
      }
    }


    /** Get previous page of search results */
    async prevResultsPage () {
      this.state.searchOffset -= 10
      if (this.state.searchOffset < 0) { this.state.searchOffset = 0 }
      this.state.searchResults = await this.search()
      document.documentElement.scrollTop = 0
    }


    /** Display selected medicine in modal window */
    async showMedicineModal (searchHit) {
      try {
        document.body.style.overflow = 'hidden'
        this.state.selectedMedicine = searchHit

      } catch (err) {
        console.error(err)
      }
    }


    /** Close the medicine detail modal */
    closeMedicineModal () {
      document.body.style.overflow = 'auto'
      this.state.selectedMedicine = null
    }



  render() {
    <div class="app-container" >

      {/* <!-- Search Bar Header --> */}
      <div class="mui-panel">
        <div class="mui-textfield">
          <input type="text" value={this.state.searchTerm} onChange={this.onSearchInput} />
          <label>Search</label>
        </div>
      </div>

      {/* <!-- Search Metadata Card --> */}
      <div class="mui-panel">
        <div class="mui--text-headline">{ state.numHits } Hits</div>
        <div class="mui--text-subhead">Displaying Results { state.searchOffset } - { state.searchOffset + 9 }</div>
      </div>

      {/* <!-- Search Results Card List --> */}
      <div class="search-results" ref="state.searchResults">

      {this.state.searchResults.map(hit => {
        <div class="mui-panel" onClick={() => showMedicineModal(hit)} >
              <div class="mui--text-title" > { hit._source.specialite } </div>
              <div class="mui-divider"></div>
              <div class="mui--text-subhead"> { hit._source.dci }</div>
              <div class="mui--text-body2"> Dosage : { hit._source.dosage }</div>
              <div class="mui--text-body2"> Forme : { hit._source.forme }</div>
        </div>
      })}

      </div>

      {/* <!-- Bottom Pagination Card --> */}
      <div class="mui-panel pagination-panel">
          <button class="mui-btn mui-btn--flat" onClick={prevResultsPage}>Prev Page</button>
          <button class="mui-btn mui-btn--flat"  onClick={nextResultsPage}>Next Page</button>
      </div>

      {/* <!-- Medicine Modal Window --> */}
      {this.state.selectedMedicine ? 
      
      <div ref="medicineModal" class="medicine-modal">
        <div class="medicine-container">

          {/* <!-- Medicine Section Metadata --> */}
          <div class="title-row">
            <div class="mui--text-display2 all-caps">{ state.selectedMedicine._source.specialite }</div>
            <div class="mui--text-display1">{ state.selectedMedicine._source.dci }</div>
          </div>

          <br/>

          <div class="info-row" >
            <div class="mui--text-subhead"> specialite : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="mui--text-body2">
              { state.selectedMedicine._source.specialite }
            </div>
          </div>

          <div class="info-row" >
            <div class="mui--text-subhead"> dosage : </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="mui--text-body2">
              { state.selectedMedicine._source.dosage }
            </div>
          </div>

          {/* Continue ... */}

        </div>

        {/* <!-- Medicine Pagination Footer --> */}
        <div class="modal-footer">
          <button class="mui-btn mui-btn--flat" onClick={closeMedicineModal}>Close</button>
        </div>

      </div>


      : null}

    </div>
  }
}

export default App;
