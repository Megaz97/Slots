/**
* Slot machine
* Author: Saurabh Odhyan | http://odhyan.com
*
* Licensed under the Creative Commons Attribution-ShareAlike License, Version 3.0 (the "License")
* You may obtain a copy of the License at
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Date: May 23, 2011 
*/
$(document).ready(function() {
    /**
    * Global variables
    */
    var completed = 0,
        imgHeight = 1374,
        posArr = [      //Probability for six images. To decrease chances of winning increase number of times the six images are repeated.
            0, //orange

            80, //number 7 

            165, //bar

            237, //guava

            310, //banana

            378, //cherry

            454, //orange

            539, //number 7

            624, //bar

            696, //guava

            769, //banana

            837, //cherry
        ];

    var win = [];

    win[0] = win[454] = win[913] = 1;

    win[80] = win[539] = win[1000] = 2;

    win[165] = win[624] = win[1085] = 3;

    win[237] = win[696] = win[1157] = 4;

    win[310] = win[769] = win[1230] = 5;

    win[378] = win[837] = win[1298] = 6;


    var isWin = false;
    var mohdLink = "http://sofgen.com/";
    var homeLink = "http://sofgen.com/";
    var tries = 10;
    var buttonIMG = document.getElementById("control");

    /**
    * @class Slot
    * @constructor
    */
    function Slot(el, max, step) {
        this.speed = 0; //speed of the slot at any point of time
        this.step = step; //speed will increase at this rate
        this.si = null; //holds setInterval object for the given slot
        this.el = el; //dom element of the slot
        this.maxSpeed = max; //max speed this slot can have
        this.pos = null; //final position of the slot    

        $(el).pan({
            fps:30,
            dir:'down'
        });
        $(el).spStop();
    }

    /**
    * @method start
    * Starts a slot
    */
    Slot.prototype.start = function() {
        var _this = this;
        $(_this.el).addClass('motion');
        $(_this.el).spStart();
        _this.si = window.setInterval(function() {
            if(_this.speed < _this.maxSpeed) {
                _this.speed += _this.step;
                $(_this.el).spSpeed(_this.speed);
            }
        }, 100);
    };

    /**
    * @method stop
    * Stops a slot
    */
    Slot.prototype.stop = function() {
        var _this = this,
            limit = 30;
        clearInterval(_this.si);
        _this.si = window.setInterval(function() {
            if(_this.speed > limit) {
                _this.speed -= _this.step;
                $(_this.el).spSpeed(_this.speed);
            }
            if(_this.speed <= limit) {
                _this.finalPos(_this.el);
                $(_this.el).spSpeed(0);
                $(_this.el).spStop();
                clearInterval(_this.si);
                $(_this.el).removeClass('motion');
                _this.speed = 0;
            }
        }, 100);
    };

    /**
    * @method finalPos
    * Finds the final position of the slot
    */
    Slot.prototype.finalPos = function() {
        var el = this.el,
            el_id,
            pos,
            posMin = 2000000000,
            best,
            bgPos,
            i,
            j,
            k;

        el_id = $(el).attr('id');
        //pos = $(el).css('background-position'); //for some unknown reason, this does not work in IE
        pos = document.getElementById(el_id).style.backgroundPosition;
        pos = pos.split(' ')[1];
        pos = parseInt(pos, 10);

        for(i = 0; i < posArr.length; i++) {
            for(j = 0;;j++) {
                k = posArr[i] + (imgHeight * j);
                if(k > pos) {
                    if((k - pos) < posMin) {
                        posMin = k - pos;
                        best = k;
                        this.pos = posArr[i]; //update the final position of the slot
                    }
                    break;
                }
            }
        }

        best += imgHeight + 4;
        bgPos = "0 " + best + "px";
        $(el).animate({
            backgroundPosition:"(" + bgPos + ")"
        }, {
            duration: 200,
            complete: function() {
                completed ++;
            }
        });
    };
    
    /**
    * @method reset
    * Reset a slot to initial state
    */
    Slot.prototype.reset = function() {
        var el_id = $(this.el).attr('id');
        $._spritely.instances[el_id].t = 0;
        $(this.el).css('background-position', '0px 4px');
        this.speed = 0;
        completed = 0;
        $('#result').html('');
    };

    function enableControl() {
        $('#control').attr("disabled", false);
    }

    function disableControl() {
        $('#control').attr("disabled", true);
    }

    function printResult() {
        var res;
        if(win[a.pos] === win[b.pos] && win[a.pos] === win[c.pos]) {
            //If win then(Mohd)?
            isWin = true;
           document.getElementById("control").src = "images/SubmitActive.png";
           buttonIMG = document.getElementById("control");
            res = "<span style='color: green;'>You Win!</span>";
        } else if (tries > 0){
            //If lose then(Mohd)?
            isWin = false;
            document.getElementById("control").src = "images/ResetInactive.png";
            buttonIMG = document.getElementById("control");
            res = "<span style='color: red;'>You Lose!</span>";
        }
        else if (tries == 0){
            document.getElementById("control").src = "images/Spinactive.png";
            buttonIMG = document.getElementById("control");
            inPlay = true;
        }
        $('#result').html(res);
    }

    function StopFirst(){
            a.stop();
            var randTime = Math.random() * (3000 - 1000) + 1000;
            setTimeout(StopSecond, randTime);
    }

    function StopSecond(){

            b.stop();
            var randTime = Math.random() * (3000 - 1000) + 1000;
            setTimeout(StopThird, randTime);

    }

     function StopThird(){

            c.stop();

    }

    function EndGame(){
        tries--;
        document.getElementById('try').innerHTML = "<span style='color: coral;'>Tries Left:" + tries + "</span>";

    }
    
    function my_button ( email_id ) //RANDOM EMAIL ID. //ZUBAIR
{ $.ajax( { type    : "POST",
            data    : { "my_id" : email_id }, //RANDOM EMAIL ID.
            url     : "update_value.php",
            success : function ( data )
                      { alert( data );
                      },
            error   : function ( xhr )
                      { alert( "error" );
                      }
        } );
}//Run every time spin is clicked

    //create slot objects
    var a = new Slot('#slot1', 30, 1),
        b = new Slot('#slot2', 45, 2),
        c = new Slot('#slot3', 70, 3);

    /**
    * Slot machine controller
    */
    var inPlay = false;
    $('#control').click(function() {
        //if (!$(this).hasClass("inPlay")) {
        if (!inPlay) {

        var x;
        //$(this).addClass("inPlay");
        inPlay = true;
        if(buttonIMG.getAttribute('src') == "images/SpinInactive.png") {
            a.start();
            b.start();
            c.start();
            my_button ( "" )
            //document.getElementById("control").src = "images/Pending.png";
            $(this).attr('src', "images/Pending.png");
            //buttonIMG = document.getElementById("control");
            EndGame();
            //(MOHD) On Click Start button
             //disable control until the slots reach max speed

            var randTime = Math.random() * (3000 - 1000) + 1000;
            setTimeout(StopFirst, randTime);
            
              //check every 100ms if slots have stopped
            //if so, enable the control
            x = window.setInterval(function() {
                if(a.speed === 0 && b.speed === 0 && c.speed === 0 && completed === 3) {
                    //$("#control").removeClass("inPlay");
                    inPlay = false;
                    enableControl();
                    window.clearInterval(x);
                    printResult();
                }
            }, 100);
        }
       else if(buttonIMG.getAttribute('src')  == "images/SubmitActive.png"){
        window.location.replace(mohdLink);
       }
        else { //reset
            //(MOHD) On Click Reset button
            a.reset();
            b.reset();
            c.reset();
            isWin = false;
            document.getElementById("control").src = "images/SpinInactive.png";
            buttonIMG = document.getElementById("control");
            //$("#control").removeClass("inPlay");
            inPlay = false;
        }
    }
    });


$('#home').click(function() {
 window.location.replace(homeLink);
});
});

