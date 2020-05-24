testimonialData = function() {

    return [

        {   name: 'Tanya Sinclair',
            job: 'UX Engineer',
            quote: '“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”',
            photo: 'images/image-tanya.jpg',
            alt: 'Tanya looking at the camera'
        },

        {   name: 'John Tarkpor',
            job: 'Junior Front-end Developer',
            quote: '“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”',
            photo: 'images/image-john.jpg',
            alt: 'John smiling'
        },

    ]
};

populate = function(person) {

    var perData = testimonialData()[person];

    document.querySelector('.name').textContent = perData.name;
    document.querySelector('.job').textContent = perData.job;
    document.querySelector('.quote').textContent = perData.quote;
    document.querySelector('.photo').src = perData.photo;
    document.querySelector('.photo').alt = perData.alt;
};

populate(0);


getCurDisplay = function() {
    var namesArr, displayedName, currentPos;
    
    //Create an array of just the names
    namesArr = testimonialData().map(function(current) {
        return current.name;
    });

    displayedName = document.querySelector('.name').textContent;

    //Find the position of the current name in the name array
    currentPos = namesArr.indexOf(displayedName);

    return currentPos;
};


var noPeople = testimonialData().length;

document.querySelector('.right').addEventListener('click' , function(){
    var current, next;
    
    current = getCurDisplay();
    next = (current + 1) % noPeople;

    populate(next);
});

document.querySelector('.left').addEventListener('click' , function(){

    var previous, current;
    
    current = getCurDisplay();

    if (current === 0) {
        previous = noPeople - 1;
    } else {
        previous = current - 1;
    };
    
    populate(previous);
});