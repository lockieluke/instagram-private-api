'use strict';
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClipsFeed = void 0;
const class_transformer_1 = require('class-transformer');
const feed_1 = require('../core/feed');
class ClipsFeed extends feed_1.Feed {
  set state(body) {
    this.moreAvailable = body.data.xdt_api__v1__clips__home__connection_v2.page_info.has_next_page;
    this.feedVariables = {
      after: body.data.xdt_api__v1__clips__home__connection_v2.page_info.end_cursor,
      before: null,
      data: {
        container_module: 'clips_tab_desktop_page',
        seen_reels: body.data.xdt_api__v1__clips__home__connection_v2.edges.map(i => {
          return { id: i.node.media.id };
        }),
      },
      first: 10,
      last: null,
    };
  }
  async request() {
    let form = {
      fb_dtsg: this.client.state.fb_dtsg,
      fb_api_caller_class: 'RelayModern',
      fb_api_req_friendly_name: 'PolarisClipsTabDesktopContainerQuery',
      server_timestamps: true,
      doc_id: '6846808792076706',
    };
    if (this.feedVariables) {
      form = Object.assign(form, {
        variables: JSON.stringify(this.feedVariables),
      });
    } else {
      form = Object.assign(form, {
        variables: JSON.stringify({ data: { container_module: 'clips_tab_desktop_page' } }),
      });
    }
    const { body } = await this.client.request.send(
      {
        url: '/api/graphql/',
        method: 'POST',
        headers: {
          Host: 'www.instagram.com',
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-FB-Friendly-Name': 'PolarisClipsTabDesktopContainerQuery',
          'User-Agent': null,
        },
        form,
      },
      true,
    );
    this.state = body;
    return body;
  }
  async items() {
    const response = await this.request();
    return response.data.xdt_api__v1__clips__home__connection_v2.edges.filter(i => i.node.media).map(i => i.node.media);
  }
}
exports.ClipsFeed = ClipsFeed;
__decorate(
  [(0, class_transformer_1.Expose)(), __metadata('design:type', Object)],
  ClipsFeed.prototype,
  'feedVariables',
  void 0,
);
//# sourceMappingURL=clips.feed.js.map
