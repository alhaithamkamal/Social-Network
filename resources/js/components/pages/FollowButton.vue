<template>
    <button href="" @click.prevent="toggleFollow" class="btn" :class="btnClasses">
          <i class="fa fa-flash"></i>
        <span>
            {{ isFollowing ? 'Unfollow' : 'Follow' }}
        </span>
    </button>
</template>

<script>
    export default {
        name: 'followButton',
        props: {
            user: Object,
            following: {type: Boolean, default: false}
        },
        data() {
            return {
                loading: false,
                isFollowing: this.following
            }
        },
        computed: {
            btnClasses() {
              return {
                  'btn-danger': this.isFollowing,
                  'btn-primary' : !this.isFollowing,
                  'btn-success': this.loading
              }
            }
        },
        methods: {
            toggleFollow() {
                this.loading = true;

                let action = this.user.isFollowing ? 'unfollowRequest' : 'followRequest'
                this.$store.dispatch(action, this.user.id).then((res) => {
                    this.loading = false;
                    this.isFollowing = !this.isFollowing;
                    this.$emit(action, this.user);
                })
            }
        },
        watch: {
            'following' (to) {
                this.isFollowing = to;
            }
        }
    }
</script>