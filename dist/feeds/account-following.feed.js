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
exports.AccountFollowingFeed = void 0;
const class_transformer_1 = require('class-transformer');
const feed_1 = require('../core/feed');
const responses_1 = require('../responses');
class AccountFollowingFeed extends feed_1.Feed {
  constructor() {
    super(...arguments);
    this.order = 'default';
    this.query = '';
    this.enableGroups = true;
    this.includesHashtags = true;
  }
  set state(body) {
    this.moreAvailable = !!body.next_max_id;
    this.nextMaxId = body.next_max_id;
  }
  async request() {
    const { body } = await this.client.request.send({
      url: `/api/v1/friendships/${this.id}/following/`,
      qs: {
        rank_token: this.rankToken,
        max_id: this.nextMaxId,
        search_surface: this.searchSurface,
        order: this.order,
        query: this.query,
        enable_groups: this.enableGroups,
        includes_hashtags: this.includesHashtags,
      },
    });
    this.state = body;
    return body;
  }
  async items() {
    const body = await this.request();
    return body.users.map(user =>
      (0, class_transformer_1.plainToClassFromExist)(
        new responses_1.AccountFollowingFeedResponseUsersItem(this.client),
        user,
      ),
    );
  }
}
exports.AccountFollowingFeed = AccountFollowingFeed;
__decorate(
  [(0, class_transformer_1.Expose)(), __metadata('design:type', String)],
  AccountFollowingFeed.prototype,
  'nextMaxId',
  void 0,
);
//# sourceMappingURL=account-following.feed.js.map
