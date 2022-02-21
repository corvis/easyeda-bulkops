const DLG_INFO_SELECTOR = '#dlg-info-msg';
window.extCopyParams = window.extCopyParams || {};

function showMsgDialog(message) {
  $(DLG_INFO_SELECTOR).html(message);
  $dlgInfo.dialog('open');
}

function findNameObj(obj) {
  for (const entry of Object.entries(obj.annotation)) {
    if (entry[1].mark == "N") {
      return entry[1];
    }
  }
  return null;
}

function replaceParams(targetObj, srcObj) {
  const destNameObj = findNameObj(targetObj);  
  const srcNameObj = findNameObj(srcObj);
  console.log("srcNameObj: ");
  console.log(srcNameObj)
  console.log("destNameObj: ");
  console.log(destNameObj);
  api('updateShape', {
   	"shapeType": "schlib",
	  "jsonCache": {
	  "gId": targetObj.head.gId,
	  "head": {"c_para":srcObj.head.c_para , "puuid":srcObj.head.puuid},
	  "annotation": (srcNameObj && destNameObj) ? {[destNameObj.gId]:{'string': srcNameObj.string}} : {}
  }});
}

function copyParams() {
  const selectedIdsStr = api('getSelectedIds');
  const selectedIds = selectedIdsStr.split(",");
  if (selectedIdsStr == "" || selectedIds.length != 1) {
    showMsgDialog("You must select one single component to copy parameters from");
    return;
  }
  const docJSON = api('getSource', {type: "json"});
  console.log(docJSON);
  console.log("SrcID: " + selectedIds[0]);
  const srcObj = docJSON.schlib[selectedIds[0]];
  window.extCopyParams.srcObj = srcObj;
  showMsgDialog("Parameters copied. <br><br><strong>WARNING:</strong> Be careful with what you are doing! Before replacing params double check the source and target components are compatible (footprints are equal, type of component is the same, etc). Otherwise there is a good chance to break your schematic.");
}

function pasteParams() {
  const selectedIdsStr = api('getSelectedIds');
  const selectedIds = selectedIdsStr.split(",");
  if (selectedIdsStr == "") {
    showMsgDialog("You must select at least one component to replace params");
    return;
  }
  if (!window.extCopyParams.srcObj) {
    showMsgDialog("You must copy parameters before pasting.");
    return;
  }
  const srcObj = window.extCopyParams.srcObj;
  const docJSON = api('getSource', {type: "json"});
  for (let i=0; i<selectedIds.length; i++) {
    let targetObj=docJSON.schlib[selectedIds[i]];
    replaceParams(targetObj, srcObj);
  }
  showMsgDialog("Parameters updated for " + selectedIds.length + " components");
}


const $dlgInfo = api('createDialog', {
	title: "Info dialog",
	content :'<div id="dlg-info-msg" style="padding: 10px;"></div>',
	width : 300,
	height : 200,
	modal : true,
	buttons : [{
			text : 'Cancel',
			cmd : 'dialog-close'
		}
	]
});

function shortId(){
  return 'bulkops';
}

function makeCommandId(commandId) {
  return `extension-${shortId()}-${commandId}`;
}


api('createCommand', {
	[makeCommandId("copyparams.copy")] : copyParams,
	[makeCommandId("copyparams.paste")] : pasteParams
});

api('createToolbarButton', {
	  fordoctype: "sch,schlib",
	  menu: [
		  { "text": "Copy Params", "cmd": makeCommandId("copyparams.copy") },
		  { "text": "Paste Params", "cmd": makeCommandId("copyparams.paste") }
	  ]
	}
);



