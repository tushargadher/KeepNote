

let addnoteBtn = document.querySelector('.button');
//adding notes dynamically on buttoin click
const updateLSData = () => {
    const textareaD = document.querySelectorAll('.text_area');
    const nots = [];//nots array
    textareaD.forEach((note) => {
        return nots.push(note.value);//add value in nots array 
    });
    //stroring notes in local storage
    localStorage.setItem('notes', JSON.stringify(nots));//we use JSON because in setItem only string is vaild to store but ours nots is an array so we use json Stringfly method to convert array into string.
}
const addNotes = (text = '') => {

    const wrap_note = document.querySelector('.wrap_note');
    const test = document.createElement('div');
    test.classList.add('.test');
    const htmlData = `
                <div class="note">
                    <div class="operation">
                        <div class="edit">
                            <img src="edit_icon.svg" alt="edit icon" class="size">
                        </div>
                        <div class="delete">
                            <img src="trash_icon.svg" alt="delete icon" class="size">
                        </div>
                    </div>
                    <textarea class="readonly_text ${text ? " " : "hide"}"readonly></textarea>
                    <textarea class="text_area ${text ? "hide" : " "}" cols="22"></textarea>
                </div>`;
    ;
    test.insertAdjacentHTML('beforeend', htmlData);
    wrap_note.appendChild(test);//for adding div.test in wrap_note div

    //getting reffernce of elemennt
    const editBtn = test.querySelector('.edit'); //here we write test.querySelector insted of document.querySelector because all element are test not in document.
    const deleBtn = test.querySelector('.delete');
    const text_readonly = test.querySelector('.readonly_text');
    const textarea = test.querySelector('.text_area');
    //toggle between mainDiv and textarea


    //this two line use for getting data from localstorage and for display data 
    text_readonly.value = text;
    textarea.value = text;


    editBtn.addEventListener('click', () => {
        text_readonly.classList.toggle('hide');
        textarea.classList.toggle('hide');

        const textareaData = textarea.value;
        text_readonly.value = textareaData;

    });
    //delete note when user click delete btn
    deleBtn.addEventListener('click', () => {
        test.remove();
        updateLSData();//this call is required because when user click on delete button then notes also deleted from localstorage
    });
    textarea.addEventListener('change', updateLSData);


}

// getting note back form localStorage 
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes)//if data are present in localstorge then condition become true
{
    notes.forEach((note) => addNotes(note))
}


addnoteBtn.addEventListener('click', () => addNotes());

//theme toggle logic start here...
let choice = document.querySelector('.choice');
const themeToggle = () => {
    if (choice.value == 'light') {
        document.body.style.background = '#E5E8E8';
        choice.style.color = 'black';
        choice.style.background = '#E5E8E8';
        document.querySelector('.navbar').style.background = '#F4D03F';
        document.querySelector('.button').style.background = '#F4D03F';
    }
    else {
        document.body.style.background = '#404040';
        choice.style.color = 'white';
        choice.style.background = '#404040';
        document.querySelector('.navbar').style.background = '#DC7633';
        document.querySelector('.button').style.background = '#DC7633';
    }
}



choice.addEventListener('click', themeToggle);


// bug to solve
// 1.dark theme remain same after refresh
// 2.space between two note verticaly and horizontaly


//add more feature
//1.user guide