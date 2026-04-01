import { Outlet } from 'react-router-dom';
import { Layout as AntLayout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  EditOutlined, 
  FileTextOutlined 
} from '@ant-design/icons';

const { Header, Content, Sider } = AntLayout;

/**
 * 主布局组件
 */
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/edit',
      icon: <EditOutlined />,
      label: '编辑',
    },
    {
      key: '/preview',
      icon: <FileTextOutlined />,
      label: '预览',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          borderBottom: '1px solid #f0f0f0'
        }}>
          简历生成器
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <AntLayout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          在线简历生成器
        </Header>
        <Content style={{ margin: '24px', overflow: 'auto' }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
