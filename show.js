// todo use browserify for this whole mess

function toArray(arr) {
  return Array.prototype.slice.call(arr)
}

// parse hash fragment thing &
// restore active slide
var slideIds = toArray(document.querySelectorAll('.slide'))
  .map(function (slide) {
    return parseInt(slide.id.replace(/[^\d]*/g,''))
  })
var activeSlideId

showSlide(parseInt(getSlideIdFromHash() || document.querySelector('.active').id.replace(/[^\d]*/g,'')) || 1)

function getSlideIdFromHash() {
  return parseInt(window.location.hash.substr(1, window.location.hash.indexOf('/')-1))
}

// bind keys for next / prev

document.addEventListener('keyup', function (e) {
  switch (e.key || e.keyIdentifier) {
    case 'Left':
    case 'PageUp':
      changeSlide(-1)
      break
    case 'Right':
    case 'PageDown':
      changeSlide(1)
      break
  }
})

document.addEventListener('click', function (e) {
  if (e.clientX > (document.querySelector('.active').offsetWidth / 2)) {
    // click right side
    changeSlide(1)
  } else {
    changeSlide(-1)
  }
})

window.addEventListener('hashchange', function (e) {
  var id = getSlideIdFromHash()
  if (id == activeSlideId) { return }
  console.log('wat')
  showSlide(id)
})

function showSlide(id) {
  console.log()
  if (typeof id !== 'number' || Number.isNaN(id) || id === activeSlideId) { return }
  console.log('=======\nSlide ' + id + ' / ' + slideIds.length)
  if (activeSlideId) { document.getElementById('slide'+activeSlideId).classList.remove('active') }
  document.getElementById('slide'+id).classList.add('active')
  activeSlideId = id
  document.location.hash = id+'/'+slideIds.length
  console.log(document.getElementById('slide'+id).textContent)
}

function changeSlide(relative) {
  var next = limit(activeSlideId + relative, 1, slideIds.length)
  showSlide(next)
}

function limit(num, min, max) {
  return Math.min(Math.max(num, min), max)
}

function adjustImageRatios() {
  var docX = document.querySelector('.active').offsetWidth
  var docY = document.querySelector('.active').offsetHeight
  var images = toArray(document.querySelectorAll('.slide > img'))
  images.forEach(function (img) {
    // we want to make the smallest dimension be 100% of screen width
    if (img.width > img.height) {
      img.style.height = '100%'
    }
    else {
      img.style.width = '100%'
    }

    // console.log(ratio, imgRatio, img)
  })
}

// adjustImageRatios()