"use client";

import { Duration } from "luxon";
import { useEffect, useState } from "react";

type Props = {
	className?: string;
	initialDuration: Duration;
	onExpire?: () => void;
};

export default function Timer({
	className,
	initialDuration,
	onExpire,
}: Props) {
	const [duration, setDuration] = useState<Duration>(initialDuration.rescale());

	useEffect(() => {
		const interval = setInterval(() => {
			setDuration(prev => {
				if (prev.seconds < 1) {
					onExpire?.();
					clearInterval(interval);
					return Duration.fromMillis(0);
				}
				return prev.minus({ seconds: 1 }).rescale();
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={className}>
			{duration.toFormat("hh:mm:ss")}
		</div>
	);
}