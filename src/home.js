function getMainElement() {
  return document.getElementById('content');
};

// Home left sidebar rendering
function homeSideBar() {

  // Container div element
  const homeSideBarDiv = document.createElement("div");
  homeSideBarDiv.textContent = "sidebar";
  getMainElement().appendChild(homeSideBarDiv);

};

// Home main container rendering
function homeContent() {

  // Container div element
  const homeContentDiv = document.createElement("div");
  homeContentDiv.textContent = "content";
  getMainElement().appendChild(homeContentDiv);

};

export { homeSideBar, homeContent };
