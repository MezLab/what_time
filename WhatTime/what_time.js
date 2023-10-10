let addTime = document.querySelector('form#addTime');
let box = document.querySelector('#add');
let btn_add = document.querySelector('#btn_add');
const timeDiv = document.getElementById('time');
let m = document.getElementById('firstField');
let s = document.getElementById('secondField');
let result = document.querySelector('small#lastTime');


class What_Time {   

    minutes = [];
    tempo = [];
    final = {
        'minuti' : 0,
        'secondi' : 0
    };


    // Apre o chiude la finestra per inserire il tempo
    open_box() {
        if (addTime.style.display == 'block') {
            addTime.style.display = 'none';
        } else {
            addTime.style.display = 'block';
        } 
    }

    time_add() {
        // Aggiunge il tempo in una array
        this.tempo.push(parseInt(m.value));
        this.tempo.push(parseInt(s.value));
        // Aggiunge il box che visualizza il tempo inserito
        this.create_box(this.tempo);
        //Aggiungi a Minutes
        this.aggiungiMinuto(this.tempo); 
        // clear Tempo
        this.tempo = [];
        //clear Form
        addTime.reset();
        // In questo stato chiude la finestra
        this.open_box();
        //--------------------
    }

    // Aggiungi un minuto all'array dei minuti
    aggiungiMinuto(tempo) {
        this.minutes.push(tempo);
    }

    // Crea il box che visualizza il tempo inserito
    create_box(tempo) {
        // Crea un nuovo elemento div
        const newTimeBox = document.createElement('div');
        newTimeBox.classList.add('d-flex', 'text-body-secondary', 'pt-3');
        newTimeBox.innerHTML = `
            <!-- Aggiunta box tempo -->
            <span id="add" class="icon me-2 rounded">Time</span>
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div class="d-flex justify-content-between">
                    <strong class="text-gray-dark">${tempo[0]} minuti : ${tempo[1]} secondi</strong>
                </div>
                <span class="d-block">@time</span>
            </div>
        `;  

        // Aggiungi il nuovo elemento al div con l'ID "time"
        timeDiv.appendChild(newTimeBox);
    }

    // Calcola Minuti/Secondi
    _calculate(_index_){
        let sec_ = 0;
        for (let index = 0; index < this.minutes.length; index++) {
                sec_ += this.minutes[index][_index_];
        }

        let _A_ = Math.trunc(sec_/60);
        let _B_ = sec_%60;

        return [_A_, _B_];
    }

    _final(){
        // Calcola il tempo esistente associandolo agli altri tempi
        let _minutes_ = this._calculate(0); // Minuti
        let _seconds_ = this._calculate(1); // Secondi

        let h = _minutes_[0];
        let m = _minutes_[1] + _seconds_[0];
        let s = _seconds_[1];

        result.innerHTML = `<strong>${h} h : ${m} m : ${s} s</strong>`;
    }
}

let wt = new What_Time();

box.addEventListener("click", wt.open_box.bind(wt));
btn_add.addEventListener("click", wt.time_add.bind(wt));