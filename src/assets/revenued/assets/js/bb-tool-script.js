// filter toggles
var toggles = document.querySelectorAll('.c-controls__dropdown__toggle');

var toggleActive = function toggleActive() {
  this.parentNode.classList.toggle('c-controls__dropdown--active');
};

for (var i = 0; i < toggles.length; i += 1) {
  toggles[i].addEventListener('click', toggleActive);
}

// update filtered and items from input
var filterInputs = document.querySelectorAll('.c-controls__checkbox');
var filtered = document.querySelector('.c-filtered');
var count = document.querySelector('.c-results__count');

var updateFiltered = function updateFiltered() {
  var count = 0;
  var html = '';
  for (var i = 0; i < filterInputs.length; i += 1) {
    if (filterInputs[i].checked) {
      var group = filterInputs[i].parentNode.parentNode.getAttribute('data-group');
      var value = filterInputs[i].value;
      count += 1;
      html += '<button class="c-filtered__remove" data-group="' + group + '" data-value="' + value + '">' + group + ': ' + value + '</button>';
    }
  }
  if (count > 0) {
    html += '<button class="c-filtered__clear">Clear All</button>';
  }
  filtered.innerHTML = html;
};

var updateItems = function updateItems() {
  var items = document.querySelectorAll('.c-results__item');
  var checked = document.querySelectorAll('.c-controls__checkbox:checked');
  for (var i = 0; i < items.length; i += 1) {
    items[i].classList.remove('c-results__item--inactive');
    for (var j = 0; j < checked.length; j += 1) {
      var group = checked[j].getAttribute('data-filter');
      var value = checked[j].value;
      var test = items[i].getAttribute('data-' + group).split(', ');
      if (!test.includes(value)) {
        items[i].classList.add('c-results__item--inactive');
      }
    }
  }
};

var updateCount = function updateCount() {
  var activeItems = document.querySelectorAll('.c-results__item:not(.c-results__item--inactive)');
  var value = activeItems.length;
  count.innerText = value + ' Result';
  if (value !== 1) {
    count.innerText += 's';
  }
};

for (var i = 0; i < filterInputs.length; i += 1) {
  filterInputs[i].addEventListener('change', function() {
    updateFiltered();
    updateItems();
    updateCount();
  });
}

// trigger matching input on filtered click
var updateInput = function updateInput(e) {
  var button = e.target;
  if (button.classList.contains('c-filtered__remove')) {
    var group = button.getAttribute('data-group');
    var value = button.getAttribute('data-value');
    var input = document.querySelector('[data-group="' + group + '"] [value="' + value + '"]');
    input.click();
  }
  if (button.classList.contains('c-filtered__clear')) {
    while (document.querySelector('.c-filtered__remove')) {
      document.querySelector('.c-filtered__remove').click();
    }
  }
};

if (filtered) {
  filtered.addEventListener('click', updateInput);
}

// sort items
var sortInputs = document.querySelectorAll('.c-controls__radio');
var container = document.querySelector('.c-results__container');

var sort = function sort(items, type) {
  items.sort(function(a, b) {
    return a.getAttribute('data-sort-all') - b.getAttribute('data-sort-all');
  });
  if (type !== 'all') {
    items.sort(function(a, b) {
      return a.getAttribute('data-sort-' + type) - b.getAttribute('data-sort-' + type);
    });
  }
  return items;
};

var sortItems = function sortItems(e) {
  var html = '';
  var items = Array.prototype.slice.call(document.querySelectorAll('.c-results__item'));
  var sorted = sort(items, e.target.value);
  for (var i = 0; i < sorted.length; i += 1) {
    html += sorted[i].outerHTML;
  }
  container.innerHTML = html;
};

for (var i = 0; i < sortInputs.length; i += 1) {
  sortInputs[i].addEventListener('change', sortItems);
}
