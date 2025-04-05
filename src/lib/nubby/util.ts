export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

// TODO: Add indentation support (see: Snakey Perk)
function htmlify(s: string | undefined) {
  if (s == undefined) return "";

  var ended = true;

  s = s.trim().replaceAll(/\[#[A-Za-z0-9]{6}\]/g, (substring: string) => {
    var hex = substring.trim().replace("]", "").replace("[", "");

    ended = !ended;
    return (
      (!ended ? "</div>" : "") +
      "<div style='color: " +
      hex +
      "' class='inline'>"
    );
  });

  s = s.replaceAll(/\[([A-Za-z0-9_]*),[0-9]+\]/g, (substring: string) => {
    var spriteName = substring.match(/(?!\[)[A-Za-z_]+(?=,[0-]+)/g);
    return (
      "<img src='dumps/sprites/" +
      spriteName +
      ".gif' class='w-4 h-4 object-contain inline'/>"
    );
  });

  s = s.replace(/\n/g, "");

  while (s.match(/\*.*/g)) {
    s = s.replaceAll(/\*.*/g, (substring: string) => {
      var contents = substring.substring(1);

      return "<li class='ml-4'>" + contents + "</li>";
    });
  }

  if (!ended) s += "</div>";

  var rawHTML = s;

  return rawHTML;
}

export { htmlify };
