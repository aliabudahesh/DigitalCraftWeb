document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.elementor-toggle .elementor-tab-title').forEach(function (title) {
    var contentId = title.getAttribute('aria-controls');
    var content = document.getElementById(contentId);
    if (content && title.getAttribute('aria-expanded') !== 'true') {
      content.style.display = 'none';
    }
    title.addEventListener('click', function (e) {
      e.preventDefault();
      var expanded = title.getAttribute('aria-expanded') === 'true';
      title.setAttribute('aria-expanded', String(!expanded));
      if (content) {
        content.style.display = expanded ? 'none' : 'block';
      }
    });
  });
});
