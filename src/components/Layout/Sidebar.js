import logo200Image from 'assets/img/anclick.jpeg';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import IconSidebar from './RenderIconSidebar'
import {
  FaAnchor,
} from 'react-icons/fa';

import {
  MdDashboard,
  MdKeyboardArrowDown
} from 'react-icons/md'

import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const bem = bn.create('sidebar');

const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
];

class Sidebar extends React.Component {
  state = {
    isOpenUsers: false,
    isOpenConfig: false,
    isOpenStock: false,
    isOpenSale: false,
    isOpenQuotitation: false,
    isOpenClient: false,
    isOpenFlowCash: false
  };



  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`${name}`];
      return {
        [`${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar className="text-center">
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                Aidy.VeanxTech
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>

            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            {this.props.menu.length > 0 ? (
              <React.Fragment>
                {this.props.menu.map((v,i) => {
                    if(v.subnivel){
                      return(
                        <React.Fragment key={i+'nav_item'}>
                          <NavItem
                            className={bem.e('nav-item')}
                            onClick={this.handleClick(v.is_open) }
                            >
                            <BSNavLink className={bem.e('nav-item-collapse')}>
                              <div className="d-flex">
                                <IconSidebar icon={v.icon} class={bem.e('nav-item-icon')} />
                                <span className=" align-self-start">{v.name_item}</span>
                              </div>
                              <MdKeyboardArrowDown
                                className={bem.e('nav-item-icon')}
                                style={{
                                  padding: 0,
                                  transform: this.state[v.is_open]
                                  ? 'rotate(0deg)'
                                  : 'rotate(-90deg)',
                                  transitionDuration: '0.3s',
                                  transitionProperty: 'transform',
                                }}
                                />
                            </BSNavLink>
                          </NavItem>
                          <Collapse isOpen={this.state[v.is_open]} key={i+'nav_collapse'}>
                            {v.sub_menu.map(({ name_sub, route }, index3) => (
                              <NavItem key={index3} className={bem.e('nav-item')}>
                                <BSNavLink
                                  id={`navItem-${name_sub}-${index3}`}
                                  className="text-uppercase"
                                  tag={NavLink}
                                  to={route}
                                  activeClassName="active"
                                  exact={true}
                                  >
                                  <span className="">{name_sub}</span>
                                </BSNavLink>
                              </NavItem>
                            ))}
                          </Collapse>
                        </React.Fragment>
                      )
                    }else{
                      return (
                        <NavItem key={i+'nav_item'} className={bem.e('nav-item')} >
                          <BSNavLink
                            id={`navItem-${v.name_item}-${i}`}
                            className="text-uppercase"
                            tag={NavLink}
                            to={v.route}
                            activeClassName="active"
                            exact={true}
                            >
                            <IconSidebar icon={v.icon} class={bem.e('nav-item-icon')} />
                            <span className="">{v.name_item}</span>
                          </BSNavLink>
                        </NavItem>
                      )
                  } // fin else
              })}
              </React.Fragment>
            ) : '' }

          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
