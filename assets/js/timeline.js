Vue.component('timeline', {
  	template: `
 		<div class="timeline" id="timeline" v-on:mousemove="dragTimeline($event)" v-on:mousedown="setMouseTracking($event, true)" v-on:mouseup="setMouseTracking($event, false)" v-on:mouseleave="disableScrolling()">
			<div class="upper-events">
				<div class="event-card" v-for="event in upperTimelineEvents">
					<div class="date">{{ dayMonthYearFormat(event.date) }}</div> 
					<div class="title">{{ event.title }}</div>
					<div class="description">{{ event.description }}</div>

					<div class="pointer">
						<div class="line"></div>
						<div class="circle">{{ dayMonthFormat(event.date) }}</div>
					</div>
				</div>
			</div>

			<div class="mainline" id="mainline"></div>

			<div class="lower-events">
				<div class="event-card" v-for="event in lowerTimelineEvents">
					<div class="date">{{ dayMonthYearFormat(event.date) }}</div> 
					<div class="title">{{ event.title }}</div>
					<div class="description">{{ event.description }}</div>

					<div class="pointer">
						<div class="line"></div>
						<div class="circle">{{ dayMonthFormat(event.date) }}</div>
					</div>
				</div>
			</div>
		</div>`,
	data: function() {
		return {
			scrollable: false,
			mouseTracking: false,
			start_x: 5,
			language: 'nl-nl',
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
		}
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
		},
		dayMonthYearFormat: function(dateString) {
			var dateObject = new Date(dateString);
			var month = dateObject.toLocaleString(this.language, { month: "long" });
			var day = dateObject.getUTCDate();
			var year = dateObject.getUTCFullYear();
			return  day + " " + month + " " + year;
		},
		dayMonthFormat: function(dateString) {
			var dateObject = new Date(dateString);
			var month = dateObject.toLocaleString(this.language, { month: "short" });

			if(month.charAt(month.length - 1) == '.') {
				month = month.substring(0, month.length - 1);
			}
			
			var day = dateObject.getUTCDate();
			return  day + " " + month;
		}
	}
})
