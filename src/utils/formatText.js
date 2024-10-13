const formatText = (text) => {
  return text
    .replaceAll("<br/>", "")
    .replaceAll("&quot;", '"')
    .replaceAll("&mdash;", "—")
    .replaceAll("&rsquo;", "'")
    .replaceAll("&#10;", " ")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&apos;", "'")
    .replaceAll("&ndash;", "-")
    .replaceAll("&bull;", "•")
    .replaceAll("&copy;", "©")
    .replaceAll("&reg;", "®")
    .replaceAll("&trade;", "™")
    .replaceAll("&hellip;", "…");
};

export default formatText;