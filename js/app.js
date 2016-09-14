// your code here!
function cleanText(text) {
  var cleanedText = text.replace(/\r?\n|\\n|\\|[(),?]|'$/g, "")
    .toLowerCase()
    .split(/[ ,!.";:-]+/)
    .filter(Boolean)
    .sort();
  return cleanedText;
};

function wordCount(cleanedText) {
  var wordCount = cleanedText.length;
  return wordCount;
};


// fails to recognize duplicate words, cannot find why.
// function uniqueWordCount(cleanedText) {
//  //var uniqueWords = 0;
//  var uniqueArray = [];
//  for(word in cleanedText) {
//   if(!(cleanedText[word] in uniqueArray)) {
//     console.log(!(cleanedText[word] in uniqueArray));
//     console.log(cleanedText[word]);
//     uniqueArray.push(cleanedText[word]);
//     console.log(uniqueArray);
//   } 
//  }
//  return uniqueArray.length;
// };

function uniqueWordCount(cleanedText) {
  var wordCount = {};
  for(word in cleanedText){
    if(cleanedText[word] in wordCount) {
      wordCount[cleanedText[word]]++
    } else {
      wordCount[cleanedText[word]] = 1;
    }
  }
  //find unique words in cleanedText array
  return Object.keys(wordCount).length;
};

function averageWordLength(cleanedText) {
  var wordLength = cleanedText.map(function(word) {
    return word.length;
  });

  var sum = 0;
  for(word in wordLength) {
    sum += wordLength[word];
  };
  return round(sum/cleanedText.length, 2);
};

//round to hundredths
//could also use .toFixed()
function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

function averageSentenceLength(text, cleanedText) {
  var sentenceCount = text.split(/[.?!]+/).filter(Boolean).length;
  var wordCount = cleanedText.length;
  return round(wordCount/sentenceCount, 2);
};

function appendAnalytics(count, unique, aveWord, aveSentence) {
  $('.text-report').removeClass('hidden');
  $('.count').append('<span>' + count + '</span>');
  $('.unique').append('<span>' + unique + '</span>');
  $('.aveWord').append('<span>' + aveWord + '</span>');
  $('.aveSentence').append('<span>' + aveSentence + '</span>');
};

$('.js-form').submit(function(event) {
  event.preventDefault();

  //remove prior results, if any
  $('.text-report').children().find("span").remove();

  var text = $(this).find('#user-text').val();

  var cleanedText = cleanText(text);
  // console.log("cleanedText: " + cleanedText);
  var count = wordCount(cleanedText);
  // console.log("count: " + count);
  var unique = uniqueWordCount(cleanedText);
  // console.log("unique: " + unique);
  var aveWord = averageWordLength(cleanedText);
  // console.log("Average Word Length: " + aveWord);
  var aveSentence = averageSentenceLength(text, cleanedText);
  // console.log("Average Sentence Length: " + aveSentence);

  appendAnalytics(count, unique, aveWord, aveSentence);
});
