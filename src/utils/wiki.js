import axios from "axios";
import $ from "jquery";

const wikiBaseUrl = "https://en.wikipedia.org/w/api.php?";

const generateWikiUrlWithProps = (props) => {
  const propsUrl = Object.entries(props).reduce((a, c, i) => {
    return `${a}${i ? "&" : ""}${c[0]}=${c[1]}`;
  }, wikiBaseUrl);
  return propsUrl;
};

const generateAbsoluteWikiUrlsInText = (text) =>
  text.replace(/\/wiki\//g, "https://en.wikipedia.org/wiki/");

export const getWikiInfo = async (title) => {
  const props = {
    origin: "*",
    action: "query",
    generator: "search",
    prop: "info",
    inprop: "url",
    format: "json",
    gsrsearch: encodeURIComponent(`${title} film`),
  };
  const result = await axios(generateWikiUrlWithProps(props));
  const pages = Object.values(result.data.query.pages);
  const firstResult = pages.length && pages.find((page) => page.index === 1);

  return {
    pageid: firstResult?.pageid,
    url: firstResult?.fullurl,
  };
};

export const getWikiParagraph = async (pageid) => {
  const props = {
    origin: "*",
    action: "parse",
    prop: "text",
    section: "0",
    format: "json",
    pageid,
  };
  const result = await axios(generateWikiUrlWithProps(props));
  const wikiContent = result?.data?.parse.text["*"];
  const firstParagraph = $(wikiContent).find("p:not([class])").html();
  return generateAbsoluteWikiUrlsInText(firstParagraph);
};
