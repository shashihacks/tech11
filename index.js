const template = document.createElement('template');
template.innerHTML = `

<form >
<h2>Adresse </h2>

<div class="row">
    <div class="col-md-4">
        <div class="form-group">
            <label for="plz">PLZ</label>
            <input type="number" class="form-control" id="plz" placeholder="Enter PLZ">

        </div>
    </div>
    <div class="col-md-8">
        <div class="form-group">
            <label for="city">City</label>
            <input type="text" class="form-control" id="city" placeholder="Enter City">

        </div>
    </div>
</div>


<div class="row">
    <div class="form-group">
        <div class="col-md-9">
            <label for="Strasse">Strasse</label>
            <select class="form-control">

                <option>Default select</option>
                <option>Default select</option>
            </select>
        </div>

        <div class="col-md-3">

            <div class="form-group">
                <label for="land">Land</label>
                <input type="text" class="form-control" id="land" placeholder="Enter Land">

            </div>
        </div>

    </div>


</div>

<div class="form-group">
    <label for="land">Land</label>
    <input type="text" class="form-control" id="land" placeholder="Enter Land">

</div>


</form>


`;

class TodoApp extends HTMLElement {
    constructor() {
        super();
        
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        // this.$todoList = this._shadowRoot.querySelector('ul');


        this.zipcodeInput = this._shadowRoot.querySelector("#plz");
        this.zipcodeInput.addEventListener('change', this.handleZipCode.bind(this));

        this.cityInput = this._shadowRoot.querySelector("#city");
    }
    get data() {
       return this._data
    }
    set data(value) {
        this._data = value

    }

    get streets() {
        return this._streets
     }
     set streets(value) {
         this._streets = value
 
     }



    handleZipCode() {

        console.log(this.zipcodeInput.value)
        console.log((this.data, typeof(this.data)), )
        this.data = JSON.parse(this.data)
        for(let i=0;i<this.data.length;i++) {
           if( this.data[i]['zipcode'] == this.zipcodeInput.value ) {
               this.cityInput.value = this.data[i]['city']
           }
        }
        

        
    }



}

window.customElements.define('to-do-app', TodoApp);