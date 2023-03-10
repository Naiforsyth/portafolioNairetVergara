// Función del menu responsive

function responsiveMenu(){
  const nav = document.querySelector("#nav")
  if(nav.className === ""){
    nav.className = "responsive"
  }else{
    nav.className = ""
  }
}