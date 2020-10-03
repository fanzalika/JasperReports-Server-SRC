/*
 * Copyright (C) 2005 - 2019 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

package com.jaspersoft.jasperserver.dto.adhoc.query.order;

import com.jaspersoft.jasperserver.dto.basetests.BaseDTOJSONPresentableTest;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author Olexandr Dahno <odahno@tibco.com>
 */

class ClientTopOrBottomNOrderTest extends BaseDTOJSONPresentableTest<ClientTopOrBottomNOrder> {

    private static final boolean TEST_CREATE_OTHER_BUCKET = true;
    private static final boolean TEST_CREATE_OTHER_BUCKET_ALT = false;

    private static final boolean TEST_LIMIT_ALL_LEVELS = true;
    private static final boolean TEST_LIMIT_ALL_LEVELS_ALT = false;

    private static final Integer TEST_LIMIT = 100;
    private static final Integer TEST_LIMIT_ALT = 1001;

    private static final String TEST_PATH = "TEST_PATH";
    private static final List<String> TEST_PATHS = Collections.singletonList(TEST_PATH);

    private static final String TEST_PATH_ALT = "TEST_PATH_ALT";
    private static final List<String> TEST_PATHS_ALT = Collections.singletonList(TEST_PATH_ALT);

    private static final Boolean TEST_ASCENDING = Boolean.TRUE;
    private static final Boolean TEST_ASCENDING_ALT = Boolean.FALSE;

    @Override
    protected List<ClientTopOrBottomNOrder> prepareInstancesWithAlternativeParameters() {
        return Arrays.asList(
                createFullyConfiguredInstance().setCreateOtherBucket(TEST_CREATE_OTHER_BUCKET_ALT),
                createFullyConfiguredInstance().setLimitAllLevels(TEST_LIMIT_ALL_LEVELS_ALT),
                createFullyConfiguredInstance().setLimit(TEST_LIMIT_ALT),
                createFullyConfiguredInstance().setPath(TEST_PATHS_ALT),
                createFullyConfiguredInstance().setAscending(TEST_ASCENDING_ALT),
                createFullyConfiguredInstance().setLimit(null),
                createFullyConfiguredInstance().setPath(null),
                createFullyConfiguredInstance().setAscending(null)
        );
    }

    @Override
    protected ClientTopOrBottomNOrder createFullyConfiguredInstance() {
        return new ClientTopOrBottomNOrder()
                .setCreateOtherBucket(TEST_CREATE_OTHER_BUCKET)
                .setLimitAllLevels(TEST_LIMIT_ALL_LEVELS)
                .setLimit(TEST_LIMIT)
                .setPath(TEST_PATHS)
                .setAscending(TEST_ASCENDING);
    }

    @Override
    protected ClientTopOrBottomNOrder createInstanceWithDefaultParameters() {
        return new ClientTopOrBottomNOrder();
    }

    @Override
    protected ClientTopOrBottomNOrder createInstanceFromOther(ClientTopOrBottomNOrder other) {
        return new ClientTopOrBottomNOrder(other);
    }
}