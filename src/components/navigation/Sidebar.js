import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
    icon: "fa-objects-column",
    link: ["/boards", "/"],
  },
  {
    name: "Tasks",
    icon: "fa-square-check",
  },
  {
    name: "Teams",
    icon: "fa-users",
  },
];

const SidebarItem = ({ name, link = "/", icon, rightIcon, handleClick }) => {
  const itemLink = Array.isArray(link) ? link[0] : link;
  const itemContent = (
    <>
      {icon && (
        <span className="sidebar_item_icon">
          <i className={`fa-regular ${icon ? icon : ""}`}></i>
        </span>
      )}
      <div className="sidebar_item_name">{name}</div>
      {rightIcon && (
        <span className="sidebar_item_right_icon">
          <i className={`fa-regular ${rightIcon ? rightIcon : ""}`}></i>
        </span>
      )}
    </>
  );

  return (
    <li
      className="sidebar_item_wrapper"
      id={`sidebar-item-${name?.toLowerCase()}`}
    >
      {handleClick ? (
        <div
          className={`sidebar_item${icon ? "" : " child"}`}
          onClick={handleClick}
        >
          {itemContent}
        </div>
      ) : (
        <Link className={`sidebar_item${icon ? "" : " child"}`} to={itemLink}>
          {itemContent}
        </Link>
      )}
    </li>
  );
};

const SidebarItemWithChildren = ({
  name,
  icon,
  children,
  drawerOpen,
  handleOpen,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) {
      setOpen(false);
    }
  }, [drawerOpen]);

  function toggleOpen() {
    if (!drawerOpen) {
      handleOpen();
      setOpen(true);
    } else {
      setOpen(!open);
    }
  }

  return (
    <>
      <SidebarItem
        name={name}
        icon={icon}
        rightIcon={`fa-angle-${open ? "up" : "down"}`}
        handleClick={toggleOpen}
      />
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

const Sidebar = ({ open, handleToggle }) => {
  const location = useLocation();
  const [indicatorPos, setIndicatorPos] = useState(
    getIndicatorPos(location?.pathname)
  );

  function getIndicatorPos(pathname) {
    const rect = document
      .getElementById(
        `sidebar-item-${navigation
          .find((child) =>
            Array.isArray(child?.link)
              ? child?.link.includes(pathname)
              : child?.link === pathname
          )
          ?.name.toLowerCase()}`
      )
      ?.getBoundingClientRect();

    console.log(pathname);
    return rect?.y - 60 || 0;
  }

  useEffect(() => {
    setIndicatorPos(getIndicatorPos(location?.pathname));
  }, [location]);

  return (
    <>
      <div className={`sidebar${open ? " active" : ""}`}>
        <div className="sidebar_header">
          <a className="app_title" href="/#">
            <div className="app_logo">
              <i className="fa-duotone fa-square-kanban"></i>
            </div>
            <div className="app_name">Plonks</div>
          </a>
          <button className="navbar_icon_btn" onClick={handleToggle}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        </div>
        <ul className="sidebar_items">
          {navigation.map((child, index) => {
            if (child.children) {
              return (
                <SidebarItemWithChildren
                  {...child}
                  key={`sidebar_item_${child?.name}_${index}`}
                  drawerOpen={open}
                  handleOpen={handleToggle}
                />
              );
            }

            return (
              <SidebarItem
                {...child}
                key={`sidebar_item_${child?.name}_${index}`}
              />
            );
          })}
          <li
            style={{ top: indicatorPos }}
            className="sidebar_item_indicator"
          ></li>
        </ul>
      </div>
      {open && <div className="sidebar_mobile_overlay"></div>}
    </>
  );
};

export default Sidebar;
