function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'POST /api/currentUser': (req, res) => {
    setTimeout(()=>{
      res.json({
        name: 'Allen',
        RETURN_CODE: 0,
        RETURN_MESSAGE: '登陆成功',
        data: [{
          name: '查询',
          icon: 'table',
          path: '/list'
        },
        {
          name: '录入',
          icon: 'plus',
          path: '/plus'
        },
        {
          name: '审核',
          icon: 'edit',
          path: '/audit'
        }]
      })
    }, 1500)
      
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    const logininfo = {
      name: 'Allen',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      title: '交互专家',
      phone: '0752-268888888',
    }
    if (password === '123' && userName === 'admin') {
      setTimeout(()=>{
        res.send({
          status: 'ok',
          type,
          RETURN_CODE: 0,
          RETURN_MESSAGE: '登陆成功',
          ...logininfo,
          data: [{
            name: '查询',
            icon: 'table',
            path: '/list'
          },
          {
            name: '录入',
            icon: 'plus',
            path: '/plus'
          },
          {
            name: '审核',
            icon: 'edit',
            path: '/audit'
          }]
        });
      },2000)
      
    } else {
      setTimeout(()=> {
        res.send({
          status: 'error',
          RETURN_CODE: 99,
          RETURN_MESSAGE: '登陆失败',
          type,
          currentAuthority: 'guest',
        });
      },2000)
    }
    
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
