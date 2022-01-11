$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

Blockly.Blocks["example_input_text"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Example Block:")
      .appendField(new Blockly.FieldTextInput("write here..."), "input");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setDeletable(true);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
Blockly.Blocks["example_dropdown"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("DropDown Block:")
      .appendField(
        new Blockly.FieldDropdown([
          ["What is the date today?", `${new Date().getDate()}`],
          ["What is the time now?", `${Math.abs((new Date().getHours())-12)+"hrs "+new Date().getMinutes()+"min "+new Date().getSeconds()+"sec"}`],
          ["How are you?", "I'm Fine.Thanks!"],
          [
            "What is JavaScript?",
            "JavaScript is a scripting language that enables you to create dynamically updating content, control multimedia, animate images, and pretty much ...",
          ],
          ["What is your name?", "Tazim"],
        ]),
        "FIELDNAME"
      );
  },
};
Blockly.JavaScript["example_dropdown"] = function (block) {
  var text_input = block.getFieldValue("FIELDNAME");

  var code = `
	var inputTextValue = "${text_input}";
  `;
  return code;
};

Blockly.JavaScript["example_input_text"] = function (block) {
  var text_input = block.getFieldValue("input");

  var code = `
	var inputTextValue = "${text_input}";
  `;
  return code;
};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
     zoom:
         {controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true},
     trashcan: true
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  redrawUi();
  Blockly.mainWorkspace.clear();
}
