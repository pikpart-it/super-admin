export const feed = {
  // video: 'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4',
  video: '',
  rtsp: [
    {
      name: 'Ramp-1',
      streamUrl: 'rtsp://admin:admin123@103.123.224.149:554/cam/realmonitor?channel=8%26subtype=1'
    },
    {
      name: 'Ramp-2',
      streamUrl: 'rtsp://admin:admin123@103.123.224.149:554/cam/realmonitor?channel=3&subtype=1'
    },
    {
      name: 'Ramp-3',
      streamUrl: 'rtsp://admin:admin123@103.123.224.149:554/cam/realmonitor?channel=7&subtype=1'
    },
    {
      name: 'Ramp-4',
      streamUrl: 'rtsp://admin:admin123@103.123.224.149:554/cam/realmonitor?channel=2&subtype=1'
    },
    {
      name: 'Ramp-5',
      streamUrl: 'rtsp://admin:admin123@103.123.224.149:554/cam/realmonitor?channel=6&subtype=1'
    },
    {
      name: 'Ramp-6',
      streamUrl: 'rtsp://admin:admin123@103.123.224.149:554/cam/realmonitor?channel=1&subtype=1'
    }
  ],
  // rtsp: 'https://rtsp.me/embed/7NSdf6AD/',
  // embed: 'b9_ZJIr_Cpc',
  embed: [  
    // {
    //   id: 1,
    //   enable: true,
    //   videoId: 'b9_ZJIr_Cpc'
    // },
    {
      id: 2,
      enable: true,
      videoId: 'jIHEL07UHlw'
    }
  ]
  //   embed: '',
  // title: 'Live Stream (Demo)',
  // description: 'Live camera streaming of Pikpart Service Center'
}

export const streamTypes = [
  { label: 'RTSP', value: 'rtsp' },
  { label: 'Embed Url', value: 'embedUrl' }
]

export const liveCamDocks = [{ videoId: 'A123', videoUrl: 'https://youtube/embed/aqz-KE-bpKQ', streamType: 'embedUrl' }]
