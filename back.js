

chrome.contextMenus.create({"title":"Save form"}, function()=>{
	console.log('Save function [WIP]');
});

//EX
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab){
  console.log(tab.url + ' now has the page UI');
  chrome.tabs.executeScript({
	//Pop up the ui on the page!
    file: 'assemble.js'
  });
  chrome.tabs.insertCSS({
	file: 'assemble.css'
  });
});