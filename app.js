function searchDropdown() {
  return {
    open: false,

    pickOption({ target }) {
      let el = this.$refs.select;
      el.value = "";
      let options = el.options;
      Array.from(options).forEach((opt) => {
        if (target.innerHTML === opt.value) {
          opt.setAttribute("selected", true);
        }
      });
      this.open = false;
      document.getElementById("result").innerHTML = "";
      this.$refs.keyword.value = "";
    },

    lookup({ target }) {
      let resultBox = document.getElementById("result");
      resultBox.innerHTML = "";
      let keyword = target.value;
      if (keyword.length < 1) {
        return;
      }

      let dropDown = this.$refs.select;
      Array.from(dropDown.options).forEach((opt) => {
        if (opt.text.toLowerCase().match(keyword.toLowerCase())) {
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
