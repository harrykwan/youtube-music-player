(function ($) {
  "use strict";

  if ($(".playlist").length == 0) return;

  var playlist = $(".playlist").mepPlaylist({
    audioHeight: "40",
    audioWidth: "100%",
    videoHeight: "40",
    videoWidth: "100%",
    audioVolume: "vertical",
    mepPlaylistLoop: true,
    alwaysShowControls: true,
    mepSkin: "mejs-audio",
    mepResponsiveProgress: true,
    mepSelectors: {
      playlist: ".playlist",
      track: ".track",
      tracklist: ".tracks",
    },
    features: [
      "meplike",
      "mepartwork",
      "mepcurrentdetails",
      "mepplaylist",
      "mephistory",
      "mepprevioustrack",
      "playpause",
      "mepnexttrack",
      "progress",
      "current",
      "duration",
      "volume",
      "mepicons",
      "meprepeat",
      "mepshuffle",
      "mepsource",
      "mepbuffering",
      "meptracklist",
      "mepplaylisttoggle",
      "youtube",
    ],
    mepPlaylistTracks: [
      {
        id: "item-3",
        title: "I Wanna Be In the Cavalry",
        except:
          "Tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.",
        link: "track.detail.html",
        thumb: { src: "images/b2.jpg" },
        src: "http://api.soundcloud.com/tracks/79031167/stream?client_id=a10d44d431ad52868f1bce6d36f5234c",
        meta: {
          author: "Jeremy Scott",
          authorlink: "artist.detail.html",
          date: "09.04.2016",
          category: "DJ",
          play: 300,
          like: 10,
          duration: "2:50",
        },
      },
    ],
  });

  // get player, then you can use the player.mepAdd(), player.mepRemove(), player.mepSelect()
  var player = playlist.find("audio, video")[0].player;

  // event on like btn
  player.$node.on("like.mep", function (e, trackid) {
    $("[track-id=" + trackid + "]").toggleClass("is-like");
  });

  // event on play
  player.$node.on("play", function (e) {
    updateDisplay();
  });

  // event on pause
  player.$node.on("pause", function (e) {
    updateDisplay();
  });

  // update when pjax end
  $(document).on("pjaxEnd", function () {
    updateDisplay();
  });

  // simulate the play btn
  $(document).on("click.btn", ".btn-playpause", function (e) {
    e.stopPropagation();
    var self = $(this);
    if (self.hasClass("is-playing")) {
      self.removeClass("is-playing");
      player.pause();
    } else {
      var item = getItem(self);
      item && player.mepAdd(item, true);
    }
  });

  function updateDisplay() {
    $("[data-id]")
      .removeClass("active")
      .find(".btn-playpause")
      .removeClass("is-playing")
      .parent()
      .removeClass("active");
    var track = player.mepGetCurrentTrack();
    if (!track || !track.id) return;
    var item = $('[data-id="' + track.id + '"]');
    if (player.media.paused) {
      item
        .removeClass("active")
        .find(".btn-playpause")
        .removeClass("is-playing")
        .parent()
        .removeClass("active");
    } else {
      item
        .addClass("active")
        .find(".btn-playpause")
        .addClass("is-playing")
        .parent()
        .addClass("active");
    }
  }

  // get item data, you can use ajax to get data from server
  function getItem(self) {
    var item = self.closest(".item");
    // track detail
    if (!item.attr("data-src")) {
      self.toggleClass("is-playing");
      $("#tracks").find(".btn-playpause").first().trigger("click");
      return false;
    }

    var obj = {
      meta: {
        author: item.find(".item-author").find("a").text(),
        authorlink: item.find(".item-author").find("a").attr("href"),
      },
      src: self.closest("[data-src]").attr("data-src"),
      thumb: {
        src: item
          .find(".item-media-content")
          .css("background-image")
          .replace(/^url\(["']?/, "")
          .replace(/["']?\)$/, ""),
      },
      title: item.find(".item-title").find("a").text(),
      link: item.find(".item-title").find("a").attr("href"),
      id: self.attr("data-id")
        ? self.attr("data-id")
        : self.closest("[data-id]").attr("data-id"),
    };
    return obj;
  }
})(jQuery);
