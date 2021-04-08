const cdn = "https://d3k6hg21rt7gsh.cloudfront.net/icons";
const profileImage = `${cdn}/profile--header.png`;
const vendorProfileHeader = `${cdn}/vendor-default-header.png`;
const scriptURL =
  "https://script.google.com/macros/s/AKfycbw2T8seh57PBnyZWwS6adWbqRvSkxtUYrjUvscVjQGiqPU8xAvZ/exec";
const userPolicy =
  "https://www.notion.so/CMOlist-Terms-Conditions-bd712155fad54667b9189d3865f608d5";
const privacyPolicy =
  "https://www.notion.so/CMOlist-Privacy-Policy-37d7804aa5dc4d3cb5c758b5265d2484";
const isSmall = window.innerWidth < 767;

export {
  cdn,
  profileImage,
  vendorProfileHeader,
  scriptURL,
  privacyPolicy,
  isSmall,
  userPolicy,
};
