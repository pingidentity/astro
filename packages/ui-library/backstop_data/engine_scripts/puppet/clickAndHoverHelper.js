module.exports = async (page, scenario) => {
  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
  const clickSelector = scenario.clickSelectors || scenario.clickSelector;
  const keyPressSelector = scenario.keyPressSelectors || scenario.keyPressSelector;
  const scrollToSelector = scenario.scrollToSelector;
  const hideSelector = scenario.hideSelectors || scenario.hideSelector;
  const textReplaceSelector = scenario.textReplaceSelector || scenario.textReplaceSelector;
  const postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]
  const interactions = scenario.interactions;

  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await page.waitFor(keyPressSelectorItem.selector);
      await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
    }
  }

  if (hoverSelector) {
    for (const hoverSelectorIndex of [].concat(hoverSelector)) {
      await page.waitFor(hoverSelectorIndex);
      await page.hover(hoverSelectorIndex);
    }
  }

  if (clickSelector) {
    for (const clickSelectorIndex of [].concat(clickSelector)) {
      await page.waitFor(clickSelectorIndex);
      await page.click(clickSelectorIndex);
    }
  }

  // this is a custom script by jfal
  if (interactions) {
    for (const interaction of interactions) {
      await page.waitFor(interaction.selector);

      if (interaction.type === "click") {
        await page.click(interaction.selector);
      } else if (interaction.type === "hover") {
        await page.hover(interaction.selector);
      }
    }
  }

  if (textReplaceSelector) {
    for (const replaceSelectorIndex of [].concat(textReplaceSelector)) {
      await page.waitFor(replaceSelectorIndex.selector);
      await page.evaluate(replace => {
        const elem = document.querySelector(replace.selector);
        elem.innerText = replace.replacement;
      }, replaceSelectorIndex);
    }
  }

  if (scrollToSelector) {
    await page.waitFor(scrollToSelector);
    await page.evaluate(scrollToSelector => {
      document.querySelector(scrollToSelector).scrollIntoView();
    }, scrollToSelector);
  }

  if (hideSelector) {
    for (const hideSelectorIndex of [].concat(hideSelector)) {
      await page.waitFor(hideSelectorIndex);
      await page.evaluate(sel => {
        const elem = document.querySelector(sel);
        const { parentNode } = elem;
        parentNode.removeChild(elem);

        const removedNode = document.createElement("div");
        removedNode.appendChild(document.createTextNode("Removed by Backstop"));

        parentNode.appendChild(removedNode);
      }, hideSelectorIndex);
    }
  }

  if (postInteractionWait) {
    await page.waitFor(postInteractionWait);
  }
};
