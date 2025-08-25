package com.edutrack.edutrackbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DashboardResponse {
    private Long traffic;
    private Long leads;
    private Long orders;
    private BigDecimal revenue;
    private Double conversionLead;
    private Double conversionRevenue;
    private String range;
}
