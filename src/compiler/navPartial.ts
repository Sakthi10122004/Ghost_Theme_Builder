/**
 * Generates a complete Handlebars partial for rendering Ghost navigation.
 * 
 * Ghost's {{navigation}} array doesn't support nested dropdowns natively, and HBS doesn't
 * support lookahead or string manipulation to implement the common "- " prefix convention.
 * To achieve the requirement ("HTML actually groups... Strip the '- ' prefix"), we output
 * the flat list via HBS, immediately followed by a Vanilla JS snippet that parses the
 * `- ` prefixes, groups children into <ul> dropdowns under the parent, and strips the prefix.
 */
export function generateNavPartial(): string {
  return `
<ul class="gh-theme-nav">
  {{#foreach navigation}}
    <li class="nav-item nav-{{slug}}" data-label="{{label}}">
      <a href="{{url absolute="true"}}">{{label}}</a>
    </li>
  {{/foreach}}
</ul>
<script>
  (function() {
    const navs = document.querySelectorAll('.gh-theme-nav');
    navs.forEach(nav => {
      const items = Array.from(nav.children);
    let currentParent = null;
    let currentDropdownUl = null;

    items.forEach(li => {
      const labelAttr = li.getAttribute('data-label') || '';
      const anchor = li.querySelector('a');
      
      if (labelAttr.startsWith('- ')) {
        // It's a sub-item. Ensure we have a parent to group it under.
        if (currentParent) {
          if (!currentDropdownUl) {
            currentDropdownUl = document.createElement('ul');
            currentDropdownUl.className = 'nav-dropdown';
            currentParent.appendChild(currentDropdownUl);
            currentParent.classList.add('has-dropdown');
          }
          // Strip the "- " prefix from the anchor text
          if (anchor) {
            anchor.textContent = labelAttr.substring(2);
          }
          currentDropdownUl.appendChild(li);
        }
      } else {
        // It's a parent item, resets the current dropdown context
        currentParent = li;
        currentDropdownUl = null;
      }
    });
    });
  })();
</script>
`;
}
