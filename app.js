const createHTMLElement = (el, attrs, inner = null) => {
  const element = document.createElement(el);
  if (inner) {
    element.innerHTML = inner;
  }
  Object.keys(attrs).forEach((attr) => element.setAttribute(attr, attrs[attr]));
  return element;
};

function searchDropdown() {
  return {
    open: false,

    initSearch() {
      document.getElementById("dropdownsearchbutton") ? null : this.loadHTML();
    },

    pickOption({ target }) {
      let el = this.$refs.select;
      el.value = "";
      let options = el.options;
      Array.from(options).forEach((opt) => {
        if (target.innerHTML === opt.value) {
          opt.setAttribute("selected", true);
        }
      });
      this.cleanArea();
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
    cleanArea() {
      this.open = false;
      document.getElementById("result").innerHTML = "";
      this.$refs.keyword.value = "";
    },
    loadHTML() {
      let searchButton = createHTMLElement(
        "button",
        {
          id: "dropdownsearchbutton",
          "x-on:click": "open = true",
          class:
            "bg-blue-500 text-white px-4 py-2 rounded no-outline focus:shadow-outline select-none",
        },
        "search dropdown"
      );
      this.$refs.select.after(searchButton);
      let modal = createHTMLElement(
        "div",
        {
          class:
            "absolute top-0 left-0 w-full h-full flex items-center justify-center",
          style: "background-color: rgba(0, 0, 0, 0.5);",
          "x-show": "open",
        },
        `<div
        class="text-left bg-white h-auto p-4 w-5/12 md:max-w-xxl md:p-6 lg:p-8 shadow-xl rounded mx-2 md:mx-0 flex items-center justify-center flex-col"
        @click.away="open = false"
      >
        <input
          type="search"
          class="rounded p-3 outline-none w-full bg-gray-200"
          placeholder="Search..."
          @keypress="lookup"
          x-ref="keyword"
        />
        <ul id="result" class="m-4 text-left w-full"></ul>
        <div class="flex justify-center mt-8">
          <button
            class="bg-gray-700 text-white px-4 py-2 rounded no-outline focus:shadow-outline select-none"
            @click="open = false"
          >
            Close
          </button>
        </div>
      </div>
    </div>`
      );
      document.getElementById("dropdownsearchbutton").after(modal);
    },
  };
}
