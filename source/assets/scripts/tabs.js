const TabItemSelector = '.tabs__tab';
const ContentItemSelector = '[data-itemtab]';

class TabsManager {
   constructor(navNode) {
      this.tabs = [];
      this.activeTab = null;

      this.initFromHtml(navNode);
      this.activateTab(this.tabs[0]);
   }

   initFromHtml(navNode) {
      const headers = navNode.querySelectorAll(TabItemSelector);
      const contents = navNode.querySelectorAll(ContentItemSelector);

      for (var i = 0; i < headers.length; i++) {
         this.registerTab(headers[i], contents[i]);
      }
   }

   registerTab(header, content) {
      const tab = new TabItem(header, content);
      tab.onActivate(() => this.activateTab(tab));
      this.tabs.push(tab);
   }

   activateTab(tabItem) {
      if (this.activeTab) {
         this.activeTab.setActive(false);
      }

      this.activeTab = tabItem;
      this.activeTab.setActive(true);
   }

}

const ActiveTabHeaderClass = '_active';
const ActiveTabContentClass = '_show';

class TabItem {
   constructor(header, content) {
      this.header = header;
      this.content = content;
   }
   onActivate(action) {
      this.header.addEventListener('click', () => action(this));
   }
   setActive(value) {
      this.header.classList.toggle(ActiveTabHeaderClass, value)
      this.content.classList.toggle(ActiveTabContentClass, value);
   }
}

let tabs = document.querySelector('#tabs')
if (tabs) {
   new TabsManager(tabs)
}