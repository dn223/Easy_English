export const THEME_KEY = "easy-english:theme";

/** Se ejecuta en el <head> antes de pintar, para que no parpadee el tema equivocado. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
