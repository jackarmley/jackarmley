/**
 * Scripts
 */
var app = app || {};
app.navToggle = function(){
    var toggleElem = document.querySelector('.site-navtoggle'),
        toggleTarget = document.querySelector('.site-header'),
        toggleClass = 'state--navactive',
        classList = toggleTarget.classList;
    toggleElem.addEventListener('click',function(){
        if(classList.contains(toggleClass)){
            classList.remove(toggleClass);
        }else{
            classList.add(toggleClass);
        }
    });
};
app.navToggle();
