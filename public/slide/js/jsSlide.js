// console.log(window.location.host)
const urlHost = window.location.host;
const hrefQuery = window.location.href.split(urlHost)[1];
// console.log(hrefQuery)
const sideBtns = document.querySelectorAll("#sideMenu li");
// console.log(sideBtns)
if(hrefQuery === '/admin/'){
   sideBtns.forEach( li => {
      li.style.display = "none";
      (li.id === "nowList" || li.id === "adminList") && (li.style.display = "block");
   })
}