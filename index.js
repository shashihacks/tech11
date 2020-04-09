const template = document.createElement('template');

template.innerHTML = `
<head>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
</head>
<style>
.adjust-btn-width {
    width:30%;
}
.item{
padding:18px;
    border-bottom: 1px solid lightgrey;

}
.list { 
    border: 1px solid lightgrey;
    z-index:100;
}

.error {
    border:1px solid red;
}
.valid {
    border:1px solid green;  
}
.wrapper {
    position: relative;
   
}
.list { 
    background-color: white;
    position: absolute;
    left: 3%;
}
.list div {
    
}
</style>
<div class="container">
    <form >
        <h2>Adresse </h2>

        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label for="plz">PLZ</label>
                    <input
                    required
                    type="number" class="form-control" id="plz" placeholder="Enter PLZ">

                </div>
            </div>
            <div class="col-md-8">
                <div class="form-group">
                    <label for="city">City</label>
                    <input required type="text" class="form-control" id="city" placeholder="Enter City">

                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-md-9">
                <div class="form-group">


                    

                    <div class="">
                    <label for="strasse">Strasse</label>
                        <input type="text" class="form-control" id="strasse" placeholder="Enter Strasse">
                        <div id="strasse-list" class="list">
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label for="house">House Nummber</label>
                    <input required type="text" class="form-control" id="house" placeholder="Enter House Nummer">

                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="land">Land</label>
                    <input type="text"
                    disabled
                    value="Deutchland"
                    class="form-control" id="land" >

                </div>
            </div>
        </div>



        <button class="btn btn-info pull-right adjust-btn-width" id="info">Info</button>
    </form>

    <div class="display-json">
        <textarea
        class="hide"
         id="myTextarea" cols="30" rows="10"></textarea>
    </div>
</div>

`;

class TodoApp extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));



        //Selectors
        this.land = this._shadowRoot.querySelector("#land");
        this.infoButton = this._shadowRoot.querySelector("#info");
        this.hausNummer = this._shadowRoot.querySelector("#house");
        this.dropdown = this._shadowRoot.querySelector(".dropdown");
        this.myTextArea = this._shadowRoot.querySelector("#myTextarea");
        this.zipcodeInput = this._shadowRoot.querySelector("#plz");
        this.cityInput = this._shadowRoot.querySelector("#city");
        this.strasse = this._shadowRoot.querySelector("#strasse");
        this.strasseList = this._shadowRoot.querySelector('#strasse-list')


        //event Listeners
        this.zipcodeInput.addEventListener('change', this.handleZipCode.bind(this));
        this.zipcodeInput.addEventListener('focusout', this.handleZipCodeError.bind(this));
        this.strasse.addEventListener('keyup', this.handleStrasse.bind(this))
        this.strasse.addEventListener('focusout', this.handleStrassetError.bind(this))
        this.strasseList.addEventListener('click', this.handleStrasseList.bind(this), false)
        this.cityInput.addEventListener('focusout', this.handleCityError.bind(this))
        this.infoButton.addEventListener('click', this.getInfo.bind(this))
        this.hausNummer.addEventListener('focusout', this.handleHouseError.bind(this))

    }

    connectedCallback() {
        this.streets = JSON.parse(this.streets)
        this.data = JSON.parse(this.data)
    }


//Getters and Setters
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


    getInfo(e) {

        e.preventDefault()
        this.myTextArea.classList.remove('hide')
        let object = {
            address: {
                zipcode: this.zipcodeInput.value,
                stadt: this.cityInput.value,
                strasse: this.strasse.value,
                hausNummer: this.hausNummer.value,
                land: this.land.value
            }

        }
console.log(object)
        if (object.address.zipcode == '')


            
        var textedJson = JSON.stringify(object, undefined, 4);
        this.myTextArea.innerHTML = textedJson;
    }


    handleHouseError() {
        console.log("focus out", this.hausNummer.value)
        if (this.hausNummer.value == '') {
            this.hausNummer.classList.remove('valid')
            this.hausNummer.classList.add('error')

        }
        else {
            this.hausNummer.classList.remove('error')
            this.hausNummer.classList.add('valid')
        }

    }
    handleZipCodeError() {
        if (this.data.filter(x => x.zipcode == this.zipcodeInput.value).length == 0) {
            this.cityInput.value = ''
            this.zipcodeInput.classList.remove('valid')
            this.zipcodeInput.classList.add('error')
        }
        else {
            this.zipcodeInput.classList.remove('error')
            this.zipcodeInput.classList.add('valid')
        }

    }
    handleStrasseList(event) {
        console.log(event)
        const clickedItem = event.target.innerText;
        console.log("clicked item", clickedItem)
        this.strasse.value = clickedItem;
        this.strasseList.innerHTML = '';
    }

    handleStrassetError() {
        //    this.dropdown.classList.remove('open')
        if (this.streets.filter(x => x == this.strasse.value).length == 0) {
            this.strasse.value = ''
            this.strasseList.innerHTML = '';
            this.strasse.classList.remove('valid')
            this.strasse.classList.add('error')
        }
        else {
            this.strasse.classList.remove('error')
            this.strasse.classList.add('valid')
        }
    }
    handleCityError() {
        console.log(this.cityInput.value)
        if (this.cityInput.value == '') {
            this.cityInput.classList.remove('valid')
            this.cityInput.classList.add('error')
            return;
        }

        const temp = this.data.filter(x => x.zipcode == this.zipcodeInput.value)[0];
        if (temp && temp.city == this.cityInput.value) {
            this.cityInput.classList.remove('error')
            this.cityInput.classList.add('valid');
            return
        } else {
            this.cityInput.value = '';
            this.cityInput.classList.remove('valid')
            this.cityInput.classList.add('error')
        }
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
        //    this.dropdown.classList.add('open')
        const temp = this.streets.filter(x => x.toString().includes(this.strasse.value));
        temp.forEach(x => {
            const el = document.createElement('div');
            el.innerText = x;
            el.classList.add('item')
            this.strasseList.appendChild(el)
        })
    }



}



window.customElements.define('to-do-app', TodoApp);