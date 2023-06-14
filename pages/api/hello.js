import geoip from 'geoip-lite';

export default function handler(req, res) {
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);
  console.log(geo)

  if (geo && geo.country === 'TR') {
    console.log('in turkey')
    res.writeHead(302, { Location: 'https://moshapparel.com' });
    res.end();
  } else {
    console.log('not in turkey')
    // Handle other cases here. For example, you might redirect to the .com site.
    res.writeHead(302, { Location: 'https://attilahomes.com' });
    res.end();
  }
}
