// We need to call this method explicitly before using any native API function.
Neutralino.init();
// When the client library connects with the Neutralino server.
Neutralino.events.on('ready', () => {
  // When the window dom content is ready
  $(document).ready(function() {
    // Loop through all the emojis in (js/emojis.js)
    Emojis.forEach((emoji) => {
      // Replace _ with whitespace and capitalize the title
      let title = (emoji[0]).replace(/_/gm, " ").toCapitalize();
      // Append all emojis
      $('div.list').append($(`<div class="emoji" title="${title}">${emoji[1]}</div>`).click(function() {
        // Define the emoji, selected text and a range to select the clicked emoji
        let emoji = $(this),
          selection = window.getSelection(),
          range = document.createRange();
        emoji.addClass('copied');
        // Select the emoji
        range.selectNodeContents(this);
        selection.removeAllRanges();
        selection.addRange(range);
        // Copy the emoji
        document.execCommand("copy");
        selection.removeAllRanges();
        setTimeout(function() {
          emoji.removeClass('copied');
        }, 200);
      }));
    });
    // When the user type something in the search input
    $('body div.search input').on('input', function() {
      let all_emojis = $('div.list div.emoji');
      // Format the search query
      let search = ($(this).val().toLowerCase()).replace(/\s+/gm, "");
      if (search.length > 0) {
        all_emojis.each(function() {
          let title = ($(this).attr('title').toLowerCase()).replace(/\s+/gm, "");
          (title.indexOf(search) <= -1) ? $(this).hide(): $(this).show();
        });
      } else {
        all_emojis.show();
      }
    });
    let github = "https://github.com/mhmdkrmabd/emoji-picker";
    $('a').text(github);
    $('a').attr('href', github);
    // On click open the github url
    $('a').click(function() {
      Neutralino.os.open(github);
    });
    // Show the info container
    $('span[info]').click(function() {
      $('div.info').toggleClass('show');
    });
  });
});
// Custom function for strings to capitalize it
String.prototype.toCapitalize = function(settings) {
  let result = '',
    string = this.toLowerCase(),
    words = string.split(/\s+/);

  words.forEach(function(word, index) {
    word = word.charAt(0).toUpperCase() + word.slice(1);
    result += word;
    if (index + 1 != words.length) result += ' ';
  });
  return result;
};
