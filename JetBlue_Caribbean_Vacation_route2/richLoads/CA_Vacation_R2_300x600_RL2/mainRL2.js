var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
// var startTime;

// Timeline reference
var tl;


//@FT VARIABLE DECLARATIONS
var showDefault=false,
    thisFeedLoaded=false,
    ctURL = "",
    defaultPrice = "69",
    origin_formatted="",
    lowestfare_faredollaramount="",
    destination_formatted="";

var price = myFT.$("#price"),
    startingAt = myFT.$("#starting_at"), 
    priceText = myFT.$("#priceText"),
    dollarSign = myFT.$("#dollar"),
    subhead = myFT.$("#subhead"),
    terms1 = myFT.$("#terms1"),
    terms2 = myFT.$("#terms2"),
    oneWay = myFT.$(".one_way"),
    default_exit = myFT.$("#default_exit"),
    h4 = myFT.$("#h4");

//@FT Setting local variable values using FT dynamic variables (instantAds)
ctURL           = myFT.instantAds.Retail_default_clickTag_URL
headline_color  = myFT.instantAds.headline_color;
subhead_color   = myFT.instantAds.subhead_color;
price_color     = myFT.instantAds.price_color;
oneWay_color    = myFT.instantAds.oneWay_color;
legal_color     = myFT.instantAds.legal_color;
oneWay_txt      = myFT.instantAds.one_way_text;
terms_txt       = myFT.instantAds.restrictions_text;

headline1_txt   = myFT.instantAds.headline1_text + myFT.instantAds.headline2_text;

function checkURL(u){
  if (u.indexOf("http://")==0||u.indexOf("https://")==0) { 
    return true
  } else {
    return false
  }
}

function setupContent() {
  h4[0].style.color = headline_color;
  price[0].style.color = price_color;
  // oneWay[0].style.color = oneWay_color;


  h4[0].innerHTML = "<span class='hidden'></span>"; // - Populates main headline
  // oneWay[0].innerHTML = oneWay_txt; // - Populates the 'one-way' text


  // //  Longest possible places names
  // origin_longform = 'Providenciales, Turks and Caicos (PLS)'
  // destination_longform = 'Providenciales, Turks and Caicos (PLS)'



h4[0].innerHTML +=
 "<span class='sm blue'>Nonstop flights from </span><br><span class='blue city'>" + "NYC" + "</span> <span class='blue to'>to</span> <span class='blue city'>" + "Aruba (AUA)" + "</span>";

   // h4[0].innerHTML +=
   // h4[0].innerHTML +=
   // "<span class='sm blue'>Nonstop flights from </span><br><span class='blue city'>" + origin_formatted + "</span> <span class='blue to'>to<br></span> <span class='blue city'>" + destination_formatted + "</span>";

  if (showDefault) {
    h4[0].innerHTML = "<span class='blue'>Fly with a sky-high experience at<br/>down-to-earth fares.</span>"; // - Populates main headline
    price[0].style.display = 'none';
    startingAt[0].style.display = 'none';
    terms1[0].style.display = 'true';
    terms2[0].style.display = 'none';

  }
  //hard code price for local testing
  //comment out before uploading
  //lowestfare_faredollaramount="8"

  // Alternate text style classes for 3 and 4 characters prices
  // e.g. $30, vs $250 vs. $1000
  priceText[0].innerHTML = lowestfare_faredollaramount;

  // var price_num_length=lowestfare_faredollaramount.length;
  // if(lowestfare_faredollaramount.length> 1){
  //   dollarSign[0].className += " dollar_"+price_num_length+"_char";
  //   priceText[0].className += " number_"+price_num_length+"_char";
  //   oneWay[0].className += " one_way_"+price_num_length+"_char";

  // }



  myFT.dispatch('RL2_ready_to_play');

}

//@FT Listener function for the custom dispatched event "theFeedLoaded")" (from base file)
// 'theFeedLoaded' contains the feed data
myFT.on('theFeedLoaded', function(e) {
  //console.log('RL1: Richload recieved feed from Base file)');
  feedLoaded(e.a);
});

//@FT Feed data callback function
function feedLoaded(feed){
  if(!thisFeedLoaded){
    thisFeedLoaded=true;
    try{

        lowestfare_faredollaramount = feed[0].lowestfare_faredollaramount;
        origin_formatted = feed[0].origin_formatted;
        destination_formatted = feed[0].destination_formatted;
        ctURL = checkURL(myFT.instantAds.Retail_dynamic_clickTag_URL) ? myFT.instantAds.Retail_dynamic_clickTag_URL : feed[0]['url'];

        if(lowestfare_faredollaramount == "0"){
            //console.log('load default');
            showDefault = true;
        }
    }catch(error){
        //Feed error handling done within base file
        //If no feed available, show default content
        showDefault = true;
    }
    setupContent();
  }
}

myFT.on('RL2_play' , function(){
  //console.log("RL2: RL2_play event triggered")
  init();
});

default_exit.on("click",function(){
    myFT.clickTag(1, ctURL);
})


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  // startTime = new Date();
  // Set Global Timeline
  tl = new TimelineMax({ onComplete: endTime });
  animate();
  setRollover();

}
function animate() {
  myFT.dispatch('show_RL2');
  tl.set(['#main_content'], {y:"+=500", autoAlpha: 1, force3D: true })
  tl.set(['#h4', '#priceHolder', '#cta', '.terms', '#terms_container'], {autoAlpha: 1, force3D: true })
  .set(["#cta"], { force3D: true, rotation: .001 })
    .addLabel('frame_4')
    // .staggerTo(['#h4', '#priceHolder', '#cta', '.terms', '#terms_container'], 0.5, { autoAlpha: 1, ease: Power1.easeInOut }, 0.3, 'frame_4')
  .to('#main_content', 1.1, { y:"-=500", ease: Back.easeOut.config(.3)})
  .to('#terms2', .1, {autoAlpha: 1, ease: Power1.easeInOut })
}


// CTA grow on hover

function setRollover() {
  document.getElementById('default_exit').addEventListener('mouseover', defaultOver, false);
  document.getElementById('default_exit').addEventListener('mouseout', defaultOut, false);
}

function defaultOver() {
  TweenMax.to('#cta', 0.25, { scale: 1.05, ease: Power1.easeInOut })
}

function defaultOut() {
  TweenMax.to('#cta', 0.25, { scale: 1, ease: Power1.easeInOut })
}

// End timer
function endTime() {
  //dispatch event to notify RL1 (where timer resides) to stop and console.log
  //banner duration time
  myFT.dispatch('stopTimer')
}

// @FT notifying base file this RL is ready to accept feed if applicable, but may not yet be ready to play animation
myFT.dispatch('RL2_available');

/*  Once feed is subsequently loaded and all elements populated with data,
    notify base file that RL1 is rendered and ready to play by using the following:
    myFT.dispatch('RL2_ready_to_play');

*/
