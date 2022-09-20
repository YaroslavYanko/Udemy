const sideBar = {
  friends: [
    {
      id: 1,
      name: "Steve Rogers",
      img: "https://i.pinimg.com/736x/eb/72/5b/eb725b03e4eca3f5d18ee7355c77855d.jpg",
    },
    {
      id: 2,
      name: "Thor",
      img: "https://kinowar.com/wp-content/uploads/2022/07/%D1%82%D0%BE%D1%80-%D0%BB%D1%8E%D0%B1%D0%BE%D0%B2-%D1%96-%D0%B3%D1%80%D1%96%D0%BC_2.jpg",
    },
    {
      id: 3,
      name: "Batman",
      img: "https://cdn.vox-cdn.com/thumbor/MjfIGnP-mv_tWB3ptu-R19DNS8s=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/23277625/Screen_Shot_2022_02_28_at_12.43.50_PM.png",
    },
  ],
};

const sidebarReducer = (state = sideBar, action) => {
  return state;
};

export default sidebarReducer;
