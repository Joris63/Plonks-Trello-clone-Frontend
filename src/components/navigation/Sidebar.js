import { useState } from "react";
import "../../styles/navigation.scss";

const navigation = [
  {
    name: "Recently added",
    icon: "fa-clock",
    children: [
      {
        name: "Board 1",
      },
      {
        name: "Board 2",
      },
    ],
  },
  {
    name: "Favorites",
    icon: "fa-star",
  },
  {
    name: "Boards",
    icon: "fa-grid-2",
  },
  {
    name: "Teams",
    icon: "fa-users",
  },
];

const SidebarItem = ({ name, link = "/#", icon, rightIcon }) => {
  return (
    <li className="sidebar_item_wrapper">
      <a className={`sidebar_item${icon ? "" : " child"}`} href={link}>
        {icon && (
          <span className="sidebar_item_icon">
            <i className={`fa-regular ${icon ? icon : ""}`}></i>
          </span>
        )}
        <div className="sidebar_item_name">{name}</div>
        {rightIcon && (
          <span className="sidebar_item_right_icon">
            <i className="fa-regular fa-angle-down"></i>
          </span>
        )}
      </a>
    </li>
  );
};

const SidebarItemWithChildren = ({ name, icon, children }) => {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <>
      <li className="sidebar_item_wrapper">
        <div className="sidebar_item" onClick={toggleOpen}>
          <span className="sidebar_item_icon">
            <i className={`fa-regular ${icon ? icon : ""}`}></i>
          </span>
          <div className="sidebar_item_name">{name}</div>
          <span className="sidebar_item_right_icon">
            <i className={`fa-regular fa-angle-${open ? "up" : "down"}`}></i>
          </span>
        </div>
      </li>
      <li
        className="sidebar_item_children_wrapper"
        style={{ height: open ? children.length * 54 : null }}
      >
        <ul className="sidebar_items_children">
          {children?.map((child, index) => (
            <SidebarItem
              key={`sidebar_child_${child?.name}_${index}`}
              {...child}
            />
          ))}
        </ul>
      </li>
    </>
  );
};

const Sidebar = ({ open, handleClose }) => {
  return (
    <div className={`sidebar${open ? " active" : ""}`}>
      <div className="sidebar_header">
        <a className="app_title" href="/#">
          <div className="app_logo">
            <i className="fa-regular fa-square-kanban"></i>
          </div>
          <div className="app_name">Plonks</div>
        </a>
        <button className="navbar_icon_btn" onClick={handleClose}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>
      <ul className="sidebar_items">
        {navigation.map((child, index) => {
          if (child.children) {
            return (
              <SidebarItemWithChildren
                key={`sidebar_item_${child?.name}_${index}`}
                {...child}
              />
            );
          }

          return (
            <SidebarItem
              key={`sidebar_item_${child?.name}_${index}`}
              {...child}
            />
          );
        })}
      </ul>
      <div className="themeSwitch"></div>
    </div>
  );
};

export default Sidebar;
