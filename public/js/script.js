const cardList = [ 
    {
    title: "Are you in love?",
    image: "images/Sailor3.png",
    link: "Find tips in getting your love",
    desciption: "Demo desciption about love"
    }, 
    {
    title: "Do you love to shop?",
    image: "images/Sailor4.png",
    link: "Get to know the latest trends",
    desciption: "Demo desciption about shopping"
    } 
]
const getCards = () => {
    $.get('/api/cards',(response) => {
        if(response.statusCode==200){
        addCards(response.data);
        }
    })
}
const clickMe = () => {
    alert("Thanks for clicking me. Have a great day!")
}

const submitForm = () => {

    let formData = {};
    formData.first_name = $('#first_name').val(); 
    formData.last_name = $('#last_name').val(); 
    formData.password = $('#password').val(); 
    formData.email = $('#email').val();
    console.log("Form Data Submitted: ", formData); 
}
    const addCards = (items) => { 
        items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
    '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
    '</div><div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+ 
    '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text">'+item.desciption+'</p>'+ 
        '</div></div></div>'; 
        $("#card-section").append(itemToAppend)
    }); 
}
$(document).ready(function(){ 
    $('.materialboxed').materialbox(); 
    $('#formSubmit').click(()=>{
    submitForm(); 
    })
    getCards();
    $('.modal').modal(); 
    });

    