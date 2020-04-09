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
<div class="col-md-9">
    <div class="form-group">
      

        <label for="strasse">Strasse</label>
        <input type="text" class="form-control" id="strasse" placeholder="Enter Strasse">


            <div id="strasse-list">

            <div>


    
        </div>
</div>
        <div class="col-md-3">
        <div class="form-group">
            <label for="house">House Nummber</label>
            <input type="text" class="form-control" id="house" placeholder="Enter House Nummer">

        </div>
    </div>





        



    </div>


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
        this.zipcodeInput.addEventListener('focusout', this.handleZipCodeError.bind(this));

        this.cityInput = this._shadowRoot.querySelector("#city");

        this.strasse = this._shadowRoot.querySelector("#strasse");
        this.strasseList = this._shadowRoot.querySelector('#strasse-list')


        this.strasse.addEventListener('keyup', this.handleStrasse.bind(this))
        this.strasse.addEventListener('focusout', this.handleStrassetError.bind(this))


        this.strasseList.addEventListener('click', this.handleStrasseList.bind(this), false)






    }

    connectedCallback() {
        this.streets = JSON.parse(this.streets)
        this.data = JSON.parse(this.data)

    }


    handleZipCodeError() {
        if (this.data.filter(x => x.zipcode == this.zipcodeInput.value).length == 0)
            this.cityInput.value = ''
    }
    handleStrasseList(event) {
        const clickedItem = event.target.innerHTML;
        this.strasse.value = clickedItem;
        this.strasseList.innerHTML = '';
    }

    handleStrassetError() {
        if (this.streets.filter(x => x == this.strasse.value).length == 0)

            this.strasse.value = ''
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


        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i]['zipcode'] == this.zipcodeInput.value) {
                this.cityInput.value = this.data[i]['city']
            }
        }




    }


    handleStrasse() {

        this.strasseList.innerHTML = '';
        if (this.strasse.value == '') {
            return
        }



        console.log(this.streets)
        const temp = this.streets.filter(x => x.toString().includes(this.strasse.value));
        temp.forEach(x => {
            const el = document.createElement('div');
            el.innerText = x;
            this.strasseList.appendChild(el)
        })
    }



}



window.customElements.define('to-do-app', TodoApp);