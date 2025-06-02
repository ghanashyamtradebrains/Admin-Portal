import { Dropdown, Menu } from "antd";
import React from "react";

function CustomDropdown({ children, menuItems, activeTrigger, menuOnclick }) {
  const menu = (
    <Menu onClick={menuOnclick} className={"bg-dark-gray "} items={menuItems} />
  );

  return (
    <div>
      <Dropdown
        overlay={menu}
        trigger={[activeTrigger]}
        placement="bottomRight"
        overlayClassName={"dropdown-child-dark"}
      >
        {children}
      </Dropdown>
    </div>
  );
}

export default CustomDropdown;
