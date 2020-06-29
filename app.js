function searchDropdown() {
  return {
    open: true,

    pickOption({ target }) {
      console.log(target.innerHTML);
    },

    lookup({ target }) {
      let resultBox = document.getElementById("result");
      resultBox.innerHTML = "";
      let keyword = target.value;
      if (keyword.length < 3) {
        return;
      }

      let dropDown = this.$refs.select;
      Array.from(dropDown.options).forEach((opt) => {
        if (opt.text.match(keyword)) {
          var node = document.createElement("LI");
          node.className =
            "w-48 min-w-full rounded p-3 bg-gray-300 mb-1 cursor-pointer";
          node.setAttribute("x-on:click", "pickOption");
          var textnode = document.createTextNode(opt.text);
          node.appendChild(textnode);
          resultBox.appendChild(node);
        }
      });
    },
  };
}
