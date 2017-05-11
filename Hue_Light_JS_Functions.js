/**
Hue_Light_JS_Functions.js
Chris Hamm
CS3160
HW13
12/2/2015

**/
var myBridgeIP; //192.168.1.91
var myAuthenticatedUsername; //1b13447e2e0727c7313ed0923dfa6beb
var URLAddress; 
var listOfLightsObj; //array that contains all of the lights that have been loaded
function extractBridgeInfo()
{
	myBridgeIP = document.getElementById("Bridge_IP_Input").value; //get the IP address of the bridge
	myAuthenticatedUsername = document.getElementById("Authenticated_Username_Input").value; //get the authenticated username
	getAllLightsInfo();
} /*end of extractBridgeInfo function */

function getAllLightsInfo()
{
	URLAddress = "http://" + myBridgeIP + "/api/" + myAuthenticatedUsername + "/lights"; //set the URL to get all light info
	var jsonResponse = jsonGET();
	listOfLightsObj = JSON.parse(jsonResponse);
	changeLightSelectionOptions();
	getSelectedLightInfo();
	enableChangableProperties(); //remove disabled feature from selects and textboxes in changable properties section
	document.getElementById("Info_Window").innerHTML = "Light info has been loaded" + "<br>" + 
														"Select which light you want to change, then press the 'Select Light' button." + "<br>" + 
														"Change the property you wish to change" + "<br>" +
														"Then press 'Apply changes' button";
}//end of get all lights info

function changeLightSelectionOptions()
{
	var temp = "";
	//change light 1's options
	temp = listOfLightsObj["1"]["name"];
	document.getElementById("Light_1").innerHTML = temp;

	//change light2 options
	temp = listOfLightsObj["2"]["name"];
	document.getElementById("Light_2").innerHTML = temp;

	//change light 3 options
	temp = listOfLightsObj["3"]["name"];
	document.getElementById("Light_3").innerHTML = temp;

	//change light 4's options
	temp = listOfLightsObj["4"]["name"];
	document.getElementById("Light_4").innerHTML = temp;

	//change light 5's options
	temp = listOfLightsObj["5"]["name"];
	document.getElementById("Light_5").innerHTML = temp;
}//end of changeLightSelectionOptions

function enableChangableProperties()
{
	//enable the 'select light' dropdown menu
	document.getElementById("Selected_Light").disabled=false;
	//enable 'select light' button
	document.getElementById("Select_Light_Button").disabled=false;
	//enable turned on t/f dropdown menu
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").disabled=false;
	//brightness textbox is enabled by getSelectedLightInfo()
	//hue textbox is enabled by getSelectedLightInfo()
	//saturation textbox is enabled by getSelectedLightInfo()
	//enable effect dropdown menu
	document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").disabled=false;
	//enable predefined light color buttons
	document.getElementById("Predefined_Red_Color_Button").disabled=false;
	document.getElementById("Predefined_Yellow_Color_Button").disabled=false;
	document.getElementById("Predefined_Green_Color_Button").disabled=false;
	document.getElementById("Predefined_Blue_Color_Button").disabled=false;
	document.getElementById("Predefined_Purple_Color_Button").disabled=false;
	document.getElementById("Predefined_White_Color_Button").disabled=false;
	document.getElementById("Apply_Changes_Button").disabled=false;
	document.getElementById("Color_Picker").disabled=false;
	document.getElementById("Get_Color_From_Color_Picker_Button").disabled=false;
	document.getElementById("Restore_LightStrip_Colorloop_To_Default_Conditions_Button").disabled=false;
	document.getElementById("Restore_All_Lights_Back_To_Default_Conditions_Button").disabled=false;
	document.getElementById("Set_Light_Default_Conditions_Button").disabled=false;
	document.getElementById("Turn_On_All_Lights_Button").disabled=false; 
	document.getElementById("Turn_Off_All_Lights_Button").disabled=false;
}//end of enableChangeableProperties

function getSelectedLightInfo()
{
	var selectedLightNumber;
	if(document.getElementById("Selected_Light").value == 'Light_1')
	{
		selectedLightNumber = "1";
	}
	else if(document.getElementById("Selected_Light").value == 'Light_2')
	{
		selectedLightNumber = "2";
	}
	else if(document.getElementById("Selected_Light").value == 'Light_3')
	{
		selectedLightNumber = "3";
	}
	else if(document.getElementById("Selected_Light").value == 'Light_4')
	{
		selectedLightNumber = "4";
	}
	else
	{
		selectedLightNumber = "5";
	}

	document.getElementById("Selected_Light_Number").innerHTML = "Light Number: " + selectedLightNumber;
	document.getElementById("Selected_Light_Name").innerHTML = "Light Name: " + listOfLightsObj[selectedLightNumber]["name"];
	document.getElementById("Selected_Light_Type").innerHTML = "Light Type: " + listOfLightsObj[selectedLightNumber]["type"];
	document.getElementById("Selected_Light_Model_ID").innerHTML = "Model ID: " + listOfLightsObj[selectedLightNumber]["modelid"];
	document.getElementById("Selected_Light_Manufacturer_Name").innerHTML = "Manufacturer Name: " + listOfLightsObj[selectedLightNumber]["manufacturername"];
	document.getElementById("Selected_Light_SWVersion").innerHTML = "SWVersion: " + listOfLightsObj[selectedLightNumber]["swversion"];
	document.getElementById("Selected_Light_Unique_ID").innerHTML = "Unique ID: " + listOfLightsObj[selectedLightNumber]["uniqueid"];
	//reseting option to the correct value for state on
	var currentSelectedLightStateOnValue = listOfLightsObj[selectedLightNumber]["state"]["on"];
	if(currentSelectedLightStateOnValue ===true)
	{
		document.getElementById("Selected_Light_State_On_Dropdown_Menu").value=true;
	}
	else    
	{
		document.getElementById("Selected_Light_State_On_Dropdown_Menu").value=false;
	}

	document.getElementById("Selected_Light_State_Brightness").innerHTML = "<form>Brightness (min=0 max=254): <input type='text' name='Selected_Light_State_Brightness_Textbox' id='Selected_Light_State_Brightness_Textbox' value='" + listOfLightsObj[selectedLightNumber]["state"]["bri"] + "'></form>";
	document.getElementById("Selected_Light_State_Hue").innerHTML = "<form>Hue (min=0 max=65535): <input type='text' name='Selected_Light_State_Hue_Textbox' id='Selected_Light_State_Hue_Textbox' value='" + listOfLightsObj[selectedLightNumber]["state"]["hue"] + "'></form>" ;
	document.getElementById("Selected_Light_State_Saturation").innerHTML = "<form>Saturation (min=0 max=254): <input type='text' name='Selected_Light_State_Saturation_Textbox' id='Selected_Light_State_Saturation_Textbox' value='"  + listOfLightsObj[selectedLightNumber]["state"]["sat"] + "'></form>";
	//document.getElementById("Selected_Light_Color_Temp").innerHTML = "<form>Color Temperature (min=2000 max=6500): <input type='text' name='Selected_Light_Color_Temp_Textbox' id='Selected_Light_Color_Temp_Textbox' value='" + listOfLightsObj[selectedLightNumber]["ct"] + "'> K</form>";
	//resetting effect option to the correct value
	var currentSelectedLightStateEffectValue = listOfLightsObj[selectedLightNumber]["state"]["effect"];
	if(currentSelectedLightStateEffectValue === "none")
	{
		document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value="none";
	}
	else if(currentSelectedLightStateEffectValue === "colorloop")
	{
		document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value="colorloop";
	}
	else
	{
		console.log("ERROR: invalid Selected Light State Effect Value: '" + currentSelectedLightStateEffectValue + "'");
	}
}//end of getSelectedLightInfo

function useDefaultCredentialsButton()
{
	document.getElementById("Bridge_IP_Input").value = "192.168.1.91";
	document.getElementById("Authenticated_Username_Input").value = "1b13447e2e0727c7313ed0923dfa6beb";
	extractBridgeInfo();
}//end of use default credentials button

function useApplyChangesButton()
{
	var selectedLightNumber; //this is repeated code!!!!!!!!!!
	if(document.getElementById("Selected_Light").value == 'Light_1')
	{
		selectedLightNumber = "1";
	}
	else if(document.getElementById("Selected_Light").value == 'Light_2')
	{
		selectedLightNumber = "2";
	}
	else if(document.getElementById("Selected_Light").value == 'Light_3')
	{
		selectedLightNumber = "3";
	}
	else if(document.getElementById("Selected_Light").value == 'Light_4')
	{
		selectedLightNumber = "4";
	}
	else
	{
		selectedLightNumber = "5";
	}
	//console.log("selectedLightNumber: " + selectedLightNumber);

	/*check to make sure all input values are legal values*/
	var foundIllegalValue = false;
	var outputErrorString = "";
	
	//check for valid turned on value
	var inputTurnedOnValue = document.getElementById("Selected_Light_State_On_Dropdown_Menu").value;
	if(inputTurnedOnValue == 'true')
	{
		console.log("Turned On input value is valid");
	}
	else if(inputTurnedOnValue == 'false')
	{
		console.log("Turned On input value is valid");
	}
	else
	{
		console.log("ERROR: Illegal Turned On input value: '" + inputTurnedOnValue +"'");
		foundIllegalValue= true;
		outputErrorString += "Invalid Turned On Value. Turned On value must be either 'true' or 'false'.";
	}
	//chack for valid brightness value
	var inputBrightnessValue = document.getElementById("Selected_Light_State_Brightness_Textbox").value;
	if((inputBrightnessValue >= 0) && (inputBrightnessValue < 255))
	{
		console.log("Brightness input value is valid");
	}
	else
	{
		console.log("ERROR: Illegal Brightness Value: '" + inputBrightnessValue + "'");
		foundIllegalValue=true;
		outputErrorString += "<br> Invalid Brightness Value. Brightness Value must be between (and including the numbers) 0 and 254.";
	}
	//check for valid hue value
	var inputHueValue = document.getElementById("Selected_Light_State_Hue_Textbox").value;
	if((inputHueValue >= 0) && (inputHueValue < 65536))
	{
		console.log("Hue input value is valid");
	}
	else
	{
		console.log("ERROR: Illegal Hue Value: '" + inputHueValue + "'");
		foundIllegalValue=true;
		outputErrorString += "<br> Invalid Hue Value. Hue value must be between (and including the numbers) 0 and 65535.";
	}
	//check for valid saturation value
	var inputSaturationValue = document.getElementById("Selected_Light_State_Saturation_Textbox").value;
	if((inputSaturationValue >= 0) && (inputSaturationValue < 255))
	{
		console.log("Saturation Input value is valid");
	}
	else
	{
		console.log("ERROR: Illegal Saturation value: '" + inputSaturationValue +"'");
		foundIllegalValue=true;
		outputErrorString += "<br> Invalid Saturation Value. Saturation value must be between (and including the numbers) 0 and 254.";
	}
	//check for valid effect value
	var inputEffectValue = document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value;
	if(inputEffectValue === ("none"))
	{
		console.log("Effect input is valid");
	}
	else if(inputEffectValue === ("colorloop"))
	{
		console.log("Effect input is valid");
	}
	else
	{
		console.log("ERROR: Illegal Effect value: '" + inputEffectValue +"'");
		foundIllegalValue=true;
		outputErrorString += "<br> Invalid Effect Value. Effect value must be either 'none' or 'colorloop'.";
	}
	//check for valid Color Temp value
	/**
	var inputColorTempValue = document.getElementById("Selected_Light_Color_Temp_Textbox").value;
	if((inputColorTempValue >= 2000) && (inputColorTempValue < 6501))
	{
		console.log("Color Temp input is valid");
	}
	else
	{
		console.log("ERROR: Illegal Color Temp Value: '" + inputColorTempValue + "'");
		foundIllegalValue= true;
		outputErrorString += "<br> Invalid Color Temp value. Color Temp value must be between (and including the numbers) 2000 and 6500.";
	} */

	//if errors, print out error message, else send json request
	if(foundIllegalValue === true)
	{
		document.getElementById("Info_Window").innerHTML = "<p style='color:red'>" + outputErrorString + "<br> Fix errors, then try again. </p>";
	}
	else
	{
		document.getElementById("Info_Window").innerHTML = "Processing json request...";
		//change values of stored light info
		applyChangesToLightInfo(selectedLightNumber,inputTurnedOnValue,inputBrightnessValue,inputHueValue,inputSaturationValue,inputEffectValue);
		//send request
		jsonPUT(selectedLightNumber);
		//display finishing message
		document.getElementById("Info_Window").innerHTML = "Finished Request. Information was sent to Light.";
	}

}//end of useApplyChangesButton

function useSetColorValueButton(selectedPredefinedLightColor)
{
	//var selectedPredefinedLightColor = document.getElementById("Predefined_Color_Dropdown_Menu").value;
	//if(selectedPredefinedLightColor === ("None"))
	//{
	//	console.log("Predefined Light Color 'None' selected. No changes will be made.");
	//}
	//else 
	if(selectedPredefinedLightColor === ("Red"))
	{
		console.log("Predefined Light Color 'Red' selected.");
		document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";
		document.getElementById("Selected_Light_State_Hue_Textbox").value = 0;
		document.getElementById("Selected_Light_State_Saturation_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Brightness_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";
		console.log("Finished changing the light settings.");
	}
	else if(selectedPredefinedLightColor === ("Yellow"))
	{
		console.log("Predefined Light Color 'Yellow' selected.");
		document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";
		document.getElementById("Selected_Light_State_Hue_Textbox").value = 12750;
		document.getElementById("Selected_Light_State_Saturation_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Brightness_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";
		console.log("Finished changing the light settings.");
	}
	else if(selectedPredefinedLightColor === ("Green"))
	{
		console.log("Predefined Light Color 'Green' selected.");
		document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";
		document.getElementById("Selected_Light_State_Hue_Textbox").value = 25500;
		document.getElementById("Selected_Light_State_Saturation_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Brightness_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";
		console.log("Finished changing the light settings.");
	}
	else if(selectedPredefinedLightColor === ("Blue"))
	{
		console.log("Predefined Light Color 'Blue' selected.");
		document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";
		document.getElementById("Selected_Light_State_Hue_Textbox").value = 46920;
		document.getElementById("Selected_Light_State_Saturation_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Brightness_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";
		console.log("Finished changing the light settings.");
	}
	else if(selectedPredefinedLightColor === ("Purple"))
	{
		console.log("Predefined Light Color 'Purple' selected.");
		document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";
		document.getElementById("Selected_Light_State_Hue_Textbox").value = 56100;
		document.getElementById("Selected_Light_State_Saturation_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Brightness_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";
		console.log("Finished changing the light settings.");
	}
	else if(selectedPredefinedLightColor === ("White"))
	{
		console.log("Predefined Light Color 'White' selected.");
		document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";
		document.getElementById("Selected_Light_State_Saturation_Textbox").value = 0;
		document.getElementById("Selected_Light_State_Brightness_Textbox").value = 254;
		document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";
		console.log("Finished changing the light settings.");
	}
	else
	{
		console.log("ERROR: Illegal input for Predefined Light Color");
	}

	document.getElementById("Info_Window").innerHTML = "Predefined Color values have been set. <br> Press the 'Apply Changes' button to change the light to that color.";
}//end of useSetColorValueButton

function applyChangesToLightInfo(selectedLightNumber,turnedOnValue, brightnessValue, hueValue, saturationValue, effectValue)
{
	listOfLightsObj[selectedLightNumber]["state"]["on"] = turnedOnValue;
	listOfLightsObj[selectedLightNumber]["state"]["bri"] = brightnessValue;
	listOfLightsObj[selectedLightNumber]["state"]["hue"] = hueValue;
	listOfLightsObj[selectedLightNumber]["state"]["sat"] = saturationValue;
	listOfLightsObj[selectedLightNumber]["state"]["effect"] = effectValue;
	console.log("new light settings have been saved");
}//end of applychangestolightinfo

/**
function convertKelvinToMired(input_Kelvin)
{
	var solution = (1000000/input_Kelvin);
	console.log("kelvin to mired solution: " + solution);
	return solution;
}//end of convert Kelvin to Mired
*/

function jsonGET()
{
	var Httpreq = new XMLHttpRequest(); //make new http request
	Httpreq.open("GET",URLAddress,false); //make get request with url
	Httpreq.send(null); //send the request
	return Httpreq.responseText;	
	
}//end of jsonGET

function jsonPUT(input_Selected_Light_Number)
{
	//setup temporary outbound URL address
	//var tempOutboundURL = "http://" + myBridgeIP + "/api/" + myAuthenticatedUsername + "/lights";
	var tempOnValue = listOfLightsObj[input_Selected_Light_Number]["state"]["on"];
	var tempBrightnessValue = parseInt(listOfLightsObj[input_Selected_Light_Number]["state"]["bri"]);
	var tempHueValue = parseInt(listOfLightsObj[input_Selected_Light_Number]["state"]["hue"]);
	var tempSaturationValue = parseInt(listOfLightsObj[input_Selected_Light_Number]["state"]["sat"]);
	var tempEffectValue = listOfLightsObj[input_Selected_Light_Number]["state"]["effect"];
	var tempOutboundCommand = '{"on":' + tempOnValue + ', "bri":' + tempBrightnessValue + ', "hue":' + tempHueValue + ', "sat":' + tempSaturationValue + ', "effect":"' + tempEffectValue + '"}';
	console.log("jsonPUT tempOutboundCommand: '" + tempOutboundCommand + "'");
	var Httpreq = new XMLHttpRequest();
	Httpreq.open('PUT', URLAddress + "/" + input_Selected_Light_Number + "/state", true);
	console.log("urlAddress: '" + URLAddress + "/" + input_Selected_Light_Number + "/state'");
	Httpreq.onreadystatechange = function ()
	{
		if(Httpreq.readyState == 4)
		{
			if(Httpreq.status==200)
			{
				console.log("Successful JSON Reply: " + Httpreq.responseText);

			}
			else
			{
				console.log("Error " + Httpreq.status);
			}
		}
	}
	Httpreq.send(tempOutboundCommand);
}//end of jsonPUT

function getSelectedColorFromColorPicker()
{
	var selectedColor = document.getElementById("Color_Picker").value;
	//console.log("Color selected: " + selectedColor);
	//convert to RGB from HEX
	var rValue = parseInt(selectedColor.charAt(1) + selectedColor.charAt(2), 16);  //extracts first to hex values for Red, skipping the pound sign
	var gValue = parseInt(selectedColor.charAt(3) + selectedColor.charAt(4), 16);  //extracts the hex values for green
	var bValue = parseInt(selectedColor.charAt(5) + selectedColor.charAt(6), 16); //extracts the hex values for blue
	//console.log("color selected: r" + String(rValue) + " g" + String(gValue) + " b" + String(bValue));
	rValue = parseInt(rValue, 10);
	gValue = parseInt(gValue, 10);
	bValue = parseInt(bValue, 10);
	console.log("color selected: rgb(" + rValue + "," + gValue + "," + bValue + ")");
	
	//converts rgb value to HSV/HSB values
	// assumes r,g,b are contained within set [0, 255] and h,s,v is between [0,1] (h will need to be modified since it ranges from 0 to 65535)
	
	//divide all rgb values by 255
	rValue = rValue/255;
	gValue = gValue/255;
	bValue = bValue/255;

	//define cmax, cmin, and delta
	var cmax = Math.max(rValue, gValue, bValue);
	var cmin = Math.min(rValue, gValue, bValue);
	var delta = cmax - cmin;

	//Calculate Hue value
	var hValue;
	if(delta == 0)
	{
		hValue = 0;
	}//end of if delta == 0
	else if(cmax == rValue)
	{
		hValue = 60 * (((gValue - bValue)/delta) % 6);
	}//end of else if cmax == rValue
	else if(cmax == gValue)
	{
		hValue = 60 * (((bValue - rValue)/delta) + 2);
	}//end of else if cmax == gValue
	else if(cmax == bValue)
	{
		hValue = 60 * (((rValue - gValue)/delta) + 4);
	}//end of else if cmax == bValue
	else
	{
		console.log("ERROR: calculating hValue, no condition was met");
		hValue = 0;
	}//end of else

	console.log("hValue:" + hValue );
	
	//if hValue is out of scope
	if(hValue > 360)
	{
		//While hValue has a value > 360, subtract 360
		while (hValue > 360)
		{
			hValue = hValue - 360;
		}//end of while hValue > 360
	}//end of if hvalue > 360
	else if(hValue < 0)
	{
		//while hValue has a value < 0 , add 360 
		while (hValue < 0)
		{
			hValue = hValue + 360;
		}//end of while hValue < 0 
	}//end of else if hvalue < 0

	console.log("hValue after reduction:" + hValue );
	
	//Divide hValue by 360 to convert to a percentage of the circular plane
	hValue = hValue / 360;

	//Multiply hValue by 65535 to get percentage of range (absolute value and round)
	hValue = Math.abs(Math.round(hValue * 65535));

	//Calculate Saturation Value
	var sValue;
	if(cmax == 0)
	{
		sValue = 0;
	}//end of if cmax ==0
	else
	{
		sValue = (delta/cmax);
	}//end of else (if cmax not equal to 0)

	//multiply sValue by 254 since range is from 0 to 254 instead of 0 to 1
	sValue = Math.round(sValue * 254);

	//Calculate value/brightness
	var vValue = Math.abs(cmax);

	//multiply vValue by 254 since range is from 0 to 254 instead of 0 to 1
	vValue = Math.round(vValue * 254);

	console.log("selected color: HSB(" + hValue + "," + sValue + "," + vValue + ")");

	//Insert color values into textboxes
	console.log("Custom color was selected.");
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";
	document.getElementById("Selected_Light_State_Hue_Textbox").value = hValue;
	document.getElementById("Selected_Light_State_Saturation_Textbox").value = sValue;
	document.getElementById("Selected_Light_State_Brightness_Textbox").value = vValue;
	document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";
	document.getElementById("Info_Window").innerHTML = "Custom color sucsessfully loaded into the textboxes. Press 'Apply Changes' button to issue the command to the light.";
	console.log("Finished changing the light settings.");

}//end of getSelectedColorFromColorPicker

function restoreLightstripColorloopToDefaultConditions(alreadyGotAllLightInfo)
{
	//console.log("DEBUG: restoreLightstripColorloopToDefaultConditions()");
	
	if(alreadyGotAllLightInfo == false)
	{
		getAllLightsInfo(); //load the light info
		console.log("Got all light info inside restoreLightstripColorloopToDefaultConditions function");
	}//end of if alreadyGotAllLightInfo == false

	//Set the selected light to Lightstrip
	//LightStrips 1
	document.getElementById("Selected_Light").selectedIndex = "3";
	
	getSelectedLightInfo(); //getting light strips info into the textboxes
	
	//Issue command to turn off the lightstrip (and set colorloop effect to None)
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "false";   //Set light state on value to false 
	useApplyChangesButton();  		//Issue the turn off command

	//Issue command to turn on the lightstrip as the defualt color of red (with colorloop effect off)
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";   //Set light state on value to true
	document.getElementById("Selected_Light_State_Hue_Textbox").value = 0;     //set color to default red
	document.getElementById("Selected_Light_State_Saturation_Textbox").value = 254;  //set color to default red
	document.getElementById("Selected_Light_State_Brightness_Textbox").value = 85;   //set color to default red
	document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";   //Set effect to none
	useApplyChangesButton();  		//Issue the turn on command with color default red

	//Issue command to turn on the color loop effect
	document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "colorloop";  //set effect to Colorloop
	useApplyChangesButton();  		//Issue the turn on color loop command
}//end of restoreLightstripColorloopToDefaultConditions

function restoreAllLightsBackToDefaultConditions()
{
	console.log("Resetting all lights back to default conditions");
	
	getAllLightsInfo(); //load the light info

	/**------------------------Reset First Porch Light--------------------------------------------------------------**/

	//Set the selected light to First Porch Light
	//Bulb #1 Porch Left
	document.getElementById("Selected_Light").selectedIndex = "0";
	
	getSelectedLightInfo(); //getting First Porch Light info into the textboxes

	//Issue command to Turn off first porch light
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "false";   //Set light state on value to false 
	useApplyChangesButton();  		//Issue the turn off command

	//Issue command to turn on first porch light and set color to default white (effect set to none)
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";   //Set light state on value to true
	document.getElementById("Selected_Light_State_Hue_Textbox").value = 0;     //set color to default white
	document.getElementById("Selected_Light_State_Saturation_Textbox").value = 0;    //set color to default white
	document.getElementById("Selected_Light_State_Brightness_Textbox").value = 170;    //set color to default white
	document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";    //set effect to none
	useApplyChangesButton();  		//Issue the turn on command with default color white

	console.log("Finished resetting First porch light");

	/**------------------------Reset Second Porch Light-------------------------------------------------------------**/
	
	//Set the selected light to Second Porch Light
	//Bulb #2 Porch Right
	document.getElementById("Selected_Light").selectedIndex = "1";
	
	getSelectedLightInfo(); //getting Second Porch Light info into the textboxes
	
	//Issue command to Turn off second porch light
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "false";   //Set light state on value to false 
	useApplyChangesButton();  		//Issue the turn off command

	//Issue command to turn on second porch light and set color to default white (effect set to none)
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";   //Set light state on value to true
	document.getElementById("Selected_Light_State_Hue_Textbox").value = 0;     //set color to default white
	document.getElementById("Selected_Light_State_Saturation_Textbox").value = 0;    //set color to default white
	document.getElementById("Selected_Light_State_Brightness_Textbox").value = 170;    //set color to default white
	document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";    //set effect to none
	useApplyChangesButton();  		//Issue the turn on command with default color white

	console.log("Finished resetting Second porch light");
	
	/**-----------------------Reset First Stair Light----------------------------------------------------------------**/

	//Set the selected light to First Stair Light
	//Bulb #3 Stairs night light
	document.getElementById("Selected_Light").selectedIndex = "2";
	
	getSelectedLightInfo(); //getting First Stair Light info into the textboxes

	//Issue command to turn off first stair light
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "false";   //Set light state on value to false 
	useApplyChangesButton();  		//Issue the turn off command

	//Issue command to turn on first stair light and set color to default red (brightness set to 1 and effect set to none)
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";   //Set light state on value to true
	document.getElementById("Selected_Light_State_Hue_Textbox").value = 0;     //set color to default red
	document.getElementById("Selected_Light_State_Saturation_Textbox").value = 254;  //set color to default red
	document.getElementById("Selected_Light_State_Brightness_Textbox").value = 1;   //set color to default red
	document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";   //Set effect to none
	useApplyChangesButton();  		//Issue the turn on command with color default red	

	console.log("Finished resetting First stair light");	

	/**-----------------------Reset Second Stair Light---------------------------------------------------------------**/
	
	//Set the selected light to Second Stair Light
	//Bulb #4 Stairs night light
	document.getElementById("Selected_Light").selectedIndex = "4";

	getSelectedLightInfo(); //getting Second Stair Light info into the textboxes

	//Issue command to turn off stair lights
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "false";   //Set light state on value to false 
	useApplyChangesButton();  		//Issue the turn off command

	//Issue command to turn on second stair light and set color to defualt purple (brightness set to 1 and effect set to none)
	document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";   //Set light state on value to true
	document.getElementById("Selected_Light_State_Hue_Textbox").value = 56100;      //Set color default purple
	document.getElementById("Selected_Light_State_Saturation_Textbox").value = 254;   //Set color default purple
	document.getElementById("Selected_Light_State_Brightness_Textbox").value = 1;    //Set color default purple
	document.getElementById("Selected_Light_State_Effect_Dropdown_Menu").value = "none";	    //set effect to none
	useApplyChangesButton();  		//Issue the turn on command with color default purple

	console.log("Finished resetting Second stair light");
	
	/**-----------------------Reset Light Strip------------------------------------------------------------------------**/
	restoreLightstripColorloopToDefaultConditions(true);
	
	console.log("Finished resetting light strip");

}//end of restoreAllLightsBackToDefaultConditions

function setLightDefaultConditions()
{
	console.log("DEBUG: setLightDefaultConditions()");
	alert("This function currently is not setup yet.");
	//TODO
}//end of setLightDefaultConditions

function turnOnAllLightsButton()
{
	var index = 0;

	while(index < 5)
	{
		document.getElementById("Selected_Light").selectedIndex = index;

		getSelectedLightInfo(); //getting  info into the textboxes

		document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "true";   //Set light state on value to true
		useApplyChangesButton();  		//Issue the turn on command 

		index = index + 1;
	}//end of while loop

	console.log("Finished turning on all of the lights");
}//end of turnOnAllLightsButton

function turnOffAllLightsButton()
{
	var index = 0;

	while(index < 5)
	{
		document.getElementById("Selected_Light").selectedIndex = index;

		getSelectedLightInfo(); //getting  info into the textboxes

		document.getElementById("Selected_Light_State_On_Dropdown_Menu").value = "false";   //Set light state on value to true
		useApplyChangesButton();  		//Issue the turn on command 

		index = index + 1;
	}//end of while loop

	console.log("Finished turning off all of the lights");
}//end of turnOffAllLightsButton