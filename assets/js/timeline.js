Vue.component('timeline', {
  	template: `
 		<div class="timeline" id="timeline" v-on:mousemove="dragTimeline($event)" v-on:mousedown="setMouseTracking($event, true)" v-on:mouseup="setMouseTracking($event, false)" v-on:mouseleave="disableScrolling()">
			<div class="upper-events">
				<div class="event-card" v-for="event in upperTimelineEvents">
					<div class="date">{{ event.date }}</div> 
					<div class="title">{{ event.title }}</div>
					<div class="description">{{ event.description }}</div>

					<div class="pointer">
						<div class="line"></div>
						<div class="circle"></div>
					</div>
				</div>
			</div>

			<div class="mainline" id="mainline"></div>

			<div class="lower-events">
				<div class="event-card" v-for="event in lowerTimelineEvents">
					<div class="date">{{ event.date }}</div> 
					<div class="title">{{ event.title }}</div>
					<div class="description">{{ event.description }}</div>

					<div class="pointer">
						<div class="line"></div>
						<div class="circle"></div>
					</div>
				</div>
			</div>
		</div>`,
	data: function() {
		return {
			scrollable: false,
			mouseTracking: false,
			start_x: 5,
		}
	},
	props: ['events'],
	mounted: function() {
		document.getElementById("mainline").style.width = timeline.scrollWidth;
	},
	computed: {
		lowerTimelineEvents: function () {
			return this.events.filter(function (event, index) {
				if(index % 2 === 0) {
					return event;
				}
			})
		},
		upperTimelineEvents: function () {
			return this.events.filter(function (event, index) {
				if(index % 2 !== 0) {
					return event;
				}
			})
		},
	},
	methods: {
		setMouseTracking: function(event, tracking) {
			this.start_x = event.clientX;
			this.mouseTracking = tracking;
		},
		dragTimeline: function(event) {
			if(this.mouseTracking) {
				this.current_x = event.clientX;
				movingPixels = (this.current_x - this.start_x) * -1;
				this.scrollTimeline(movingPixels);
				this.start_x = this.current_x;
			}
		},
		scrollTimeline: function(movingPixels) {
		   timeline.scrollTop += movingPixels;
		   timeline.scrollLeft += movingPixels;
		},
		disableScrolling: function(scrolling) {
			this.mouseTracking = false;
		}
	}
})
