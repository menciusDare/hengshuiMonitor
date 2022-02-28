<template>
    <div class="test-videojs">
        <video id="videoPlayer" class="video-js" muted></video>
    </div>
</template>

<script>
import Videojs from "video.js";
	export default {
        props: {
            url: String,
            kitToken: String,
            poster: String,
            item: Object
        },
		data() {
			return {
                nowPlayVideoUrl: "",
                options: {
                    autoplay: true,
                    muted: true,
                    preload: "auto",
                    controls: true
                },
                player:null
			}
		},
		methods: {
            getVideo(nowPlayVideoUrl) {
                if (nowPlayVideoUrl) {
                    this.player = Videojs("videoPlayer", this.options);
                    this.player.src([
                        {
                            src: nowPlayVideoUrl,
                            type: "application/x-mpegURL"
                        }
                    ]);
                }
            },
            changeSource(url) {
                this.nowPlayVideoUrl = url;
            }
		},
		mounted() {
			this.$nextTick(() => {
                this.nowPlayVideoUrl = this.url
				this.getVideo(this.nowPlayVideoUrl);
			})
		},
        watch: {
            url(newVal, old) {
                this.getVideo(newVal);
            }
        },
        beforeDestroy() {
            if (this.player) {
                this.player.dispose();
            }
        }
	}

</script>
<style scoped>
    #videoPlayer {
        width: 636px;
        height: 425px;
    }
</style>

